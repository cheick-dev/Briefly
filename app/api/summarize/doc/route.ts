export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

import {
	extractTextFromPDF,
	processDocx,
	processTxt,
	processXlsx,
} from "@/actions";
import { generateContent } from "@/actions/gemini";

const docContext = `Ce contenu provient d'un document. Résume les sections importantes en mettant en avant les points clés et les idées principales. Si le document contient plusieurs chapitres ou sections, présente une vue d'ensemble équilibrée. Fournis un titre pertinent pour le résumé basé sur le thème principal du document. Si possible, identifie le type de document (rapport, essai académique, article) pour guider la structure du résumé. Ignore les détails insignifiants ou répétitifs. Si le document est long, limite le résumé à 200 mots par section principale.`;

// Définir les formats de fichiers autorisés
const ALLOWED_MIME_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
	try {
		// Vérifie si le dossier "uploads" existe, sinon le créer
		await fs.mkdir(UPLOADS_DIR, { recursive: true });

		const formData = await req.formData();
		const file = formData.get("file") as File | null;

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

		// Génère un nom unique pour le fichier
		const fileName = `${Date.now()}-${file.name}`;
		const filePath = path.join(UPLOADS_DIR, fileName);

		// Lis le contenu du fichier et l'écrit sur le serveur
		const buffer = Buffer.from(await file.arrayBuffer());
		await fs.writeFile(filePath, buffer);

		// Extraction de l'extension du fichier
		const fileExtension = path.extname(file.name).toLowerCase();

		let extractedText: string | null = null;

		switch (fileExtension) {
			case ".txt":
				extractedText = await processTxt(filePath);
				break;
			case ".docx":
				extractedText = await processDocx(filePath);
				break;
			case ".xlsx":
				extractedText = await processXlsx(filePath);
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
		// Supprime le fichier temporaire après traitement
		await fs.unlink(filePath);

		const { content, title } = await generateContent(
			extractedText,
			docContext
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
