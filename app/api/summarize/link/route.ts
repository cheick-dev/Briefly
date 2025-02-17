import { generateContent } from "@/actions/gemini";
import { summarizeText } from "@/actions/summarizer";
import { getVideoTranscription } from "@/actions/youtube";
import { NextRequest, NextResponse } from "next/server";

const linkContext =
	"Analyse et résume le texte provenant d'un lien youtube, identifiant les points clés, les informations principales et les idées importantes.";

export async function POST(req: NextRequest) {
	try {
		const { link, niveau } = await req.json();

		if (!link) {
			return NextResponse.json(
				{ error: "Aucun lien fourni" },
				{ status: 400 }
			);
		}
		const transcription = await getVideoTranscription(link);
		if (!transcription) {
			return NextResponse.json(
				{ error: "Impossible de récupérer la transcription" },
				{ status: 400 }
			);
		}

		const text = await summarizeText(transcription, linkContext, niveau);
		const { content, title } = await generateContent(text);

		return NextResponse.json({
			message: "Lien uploadé avec succès",
			title,
			content,
		});
	} catch (error) {
		console.error("Erreur lors de l'upload :", error);
		return NextResponse.json(
			{ error: "Erreur interne du serveur" },
			{ status: 500 }
		);
	}
}
