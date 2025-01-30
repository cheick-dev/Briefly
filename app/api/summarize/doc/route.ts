export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

import { extractTextFromPDF } from "@/actions";
import { generateContent } from "@/actions/gemini";

const docContext =
	"Analyse et résume le texte provenant d'un document suivant en identifiant les points clés, les informations principales et les idées importantes.";

const ALLOWED_MIME_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File | null;
		const niveau = formData.get("niveau") as string;

		if (!file) {
			return NextResponse.json(
				{ error: "Aucun fichier fourni" },
				{ status: 400 }
			);
		}

		// Vérifie le type de fichier
		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			return NextResponse.json(
				{ error: "Type de fichier non supporté" },
				{ status: 400 }
			);
		}

		// Extraction de l'extension du fichier
		const fileExtension = path.extname(file.name).toLowerCase();

		let extractedText: string | null = null;

		switch (fileExtension) {
			case ".txt":
				extractedText = await processTxt(file);
				break;
			case ".docx":
				extractedText = await processDocx(file);

				break;
			case ".xlsx":
				extractedText = await processXlsx(file);
				break;
			case ".pdf":
				// Tu peux réutiliser ta logique PDF ici
				extractedText = await extractTextFromPDF(file);
				break;
			default:
				return NextResponse.json(
					{ error: "Type de fichier non pris en charge" },
					{ status: 400 }
				);
		}

		const { content, title } = await generateContent(
			extractedText,
			docContext,
			niveau
		);

		return NextResponse.json({
			message: "Fichier uploadé avec succès",
			content,
			title,
		});
	} catch (error) {
		console.error("Erreur lors de l'upload :", error);
		return NextResponse.json(
			{ error: "Erreur interne du serveur" },
			{ status: 500 }
		);
	}
}

const processTxt = async (file: File) => {
	const content = await file.text(); // Utilise la méthode text() pour lire le contenu
	return content;
};

// Fonction pour traiter les fichiers Word (.docx)
const processDocx = async (file: File) => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const { value: text } = await mammoth.extractRawText({ buffer });
	return text;
};

// Fonction pour traiter les fichiers Excel (.xlsx)
const processXlsx = async (file: File) => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const workbook = XLSX.read(buffer);
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const data = XLSX.utils.sheet_to_json(sheet);
	return JSON.stringify(data, null, 2);
};
