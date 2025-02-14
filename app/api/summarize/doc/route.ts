export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { generateContent } from "@/actions/gemini";
import { summarizePdf } from "@/actions/summarizer";
import {
	deleteFileFromAppwrite,
	getFileUrl,
	updateFile,
	uploadFileToAppwrite,
} from "@/lib/appwrite";
import { convertToPdf } from "@/actions";

const docContext =
	"Analyse et résume le texte provenant d'un document, identifiant les points clés, les informations principales et les idées importantes.";

const ALLOWED_MIME_TYPES = [
	"text/plain",
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

		const fileId = await uploadFileToAppwrite(file);

		// Générer l'URL de téléchargement du fichier

		let extractedText: string | null = null;
		if (fileExtension === ".pdf") {
			extractedText = await summarizePdf(
				getFileUrl(fileId),
				docContext,
				niveau
			);
		} else {
			const newFile = await convertToPdf(file, file.type);
			const newFileId = await uploadFileToAppwrite(newFile);
			extractedText = await summarizePdf(
				getFileUrl(newFileId),
				docContext,
				niveau
			);
		}

		if (extractedText && extractedText.length > 0) {
			const { content, title } = await generateContent(extractedText);
			await deleteFileFromAppwrite(fileId);

			return NextResponse.json({
				message: "Fichier uploadé avec succès",
				content,
				title,
			});
		}

		return NextResponse.json(
			{
				message: "Aucun texte trouvé",
				content: null,
				title: null,
			},
			{ status: 400 }
		);
	} catch (error) {
		console.error("Erreur lors de l'upload :", error);
		return NextResponse.json(
			{ error: "Erreur interne du serveur" },
			{ status: 500 }
		);
	}
}
