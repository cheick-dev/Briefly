export const dynamic = "force-dynamic";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { saveFileLocally } from "@/lib/saveFile";
import fs, { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

import {
	convertExcelToPdf,
	convertTxtToPdf,
	convertWordToPdf,
} from "@/actions";
import { generateContent } from "@/actions/gemini";
import { summarizePdf } from "@/actions/summarizer";
import { storage } from "@/lib/appwrite";

const docContext =
	"Analyse et résume le texte provenant d'un document, identifiant les points clés, les informations principales et les idées importantes.";

const ALLOWED_MIME_TYPES = [
	"text/plain",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

const UPLOADS_DIR = "/tmp";

export async function POST(req: NextRequest) {
	try {
		// Vérifie si le dossier "uploads" existe, sinon le créer
		await fs.mkdir(UPLOADS_DIR, { recursive: true });
		// await fs.mkdir(uploadDir, { recursive: true });
		// const supabase = createRouteHandlerClient({ cookies });

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

		// Génère un nom unique pour le fichier
		const fileName = `${Date.now()}-${file.name}`;
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		const filePath = await saveFileLocally(fileName, fileBuffer);

		// Extraction de l'extension du fichier
		const fileExtension = path.extname(file.name).toLowerCase();

		// const uploadedFile = await storage.createFile(
		// 	process.env.APPWRITE_BUCKET_ID!,
		// 	"unique()", // ID auto-généré
		// 	file
		// );

		// Générer l'URL de téléchargement du fichier
		// const filePath = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

		// const result = await storage.getFile(
		// 	process.env.APPWRITE_BUCKET_ID!, // bucketId
		// 	// uploadedFile.$id // fileId
		// 	"67ab21ece3eb3374558d"
		// );
		// console.log(result);

		// return NextResponse.json({ url: filePath });

		let extractedText: string | null = null;

		switch (fileExtension) {
			case ".txt":
				extractedText = await summarizePdf(
					await convertTxtToPdf(filePath, UPLOADS_DIR),
					docContext,
					niveau
				);
				break;
			case ".docx":
				extractedText = await summarizePdf(
					await convertWordToPdf(filePath, UPLOADS_DIR),
					docContext,
					niveau
				);
				break;
			case ".xlsx":
				extractedText = await summarizePdf(
					await convertExcelToPdf(filePath, UPLOADS_DIR),
					docContext,
					niveau
				);
				break;
			case ".pdf":
				extractedText = await summarizePdf(
					filePath,
					docContext,
					niveau
				);
				break;
			default:
				return NextResponse.json(
					{ error: "Type de fichier non pris en charge" },
					{ status: 400 }
				);
		}

		if (extractedText && extractedText.length > 0) {
			const { content, title } = await generateContent(extractedText);
			// await storage.deleteFile(
			// 	process.env.APPWRITE_BUCKET_ID!, // bucketId
			// 	uploadedFile.$id // fileId
			// );

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
