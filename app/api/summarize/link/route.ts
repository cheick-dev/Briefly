import { generateContent } from "@/actions/gemini";
import { getVideoTranscription } from "@/actions/youtube";
import { NextRequest, NextResponse } from "next/server";

const linkContext =
	"Analyse et résume le texte provenant d'un lien youtube suivant en identifiant les points clés, les informations principales et les idées importantes.";

export async function POST(req: NextRequest) {
	try {
		const { link, niveau } = await req.json();

		if (!link) {
			return NextResponse.json(
				{ error: "Aucun lien fourni" },
				{ status: 400 }
			);
		}

		const data = await getVideoTranscription(link);
		const { content, title } = await generateContent(
			data,
			linkContext,
			niveau
		);

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
