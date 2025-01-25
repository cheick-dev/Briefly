import { generateContent } from "@/actions/gemini";
import { NextRequest, NextResponse } from "next/server";

const textContentContext = `Analyse et résume le texte brut suivant en identifiant les points clés, les informations principales et les idées importantes. Le résumé doit être clair, organisé et concis, tout en maintenant une fluidité dans l'écriture. Fournis un titre pertinent pour le résumé qui reflète le contenu principal. Limite le résumé à 150 mots, sauf indication contraire. Si le texte est technique ou contient des termes spécifiques, préserve la précision des termes tout en simplifiant la compréhension globale.`;

export async function POST(req: NextRequest) {
	try {
		const textContent = await req.json();

		if (!textContent) {
			return NextResponse.json(
				{ error: "Aucun lien fourni" },
				{ status: 400 }
			);
		}
		const { content, title } = await generateContent(
			textContent,
			textContentContext
		);

		return NextResponse.json({
			message: "Texte uploadé avec succès",
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
