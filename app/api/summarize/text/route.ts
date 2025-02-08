import { generateContent } from "@/actions/gemini";
import { summarizeText } from "@/actions/summarizer";
import { NextRequest, NextResponse } from "next/server";

const textContentContext =
	"Analyse et résume le texte brut, identifiant les points clés, les informations principales et les idées importantes.";

export async function POST(req: NextRequest) {
	try {
		const { textContent, niveau } = await req.json();

		if (!textContent) {
			return NextResponse.json(
				{ error: "Aucun lien fourni" },
				{ status: 400 }
			);
		}
		const text = await summarizeText(
			textContent,
			textContentContext,
			niveau
		);
		const { content, title } = await generateContent(text);

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
