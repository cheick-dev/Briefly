import { generateContent } from "@/actions/gemini";
import { getVideoTranscription } from "@/actions/youtube";
import { NextRequest, NextResponse } from "next/server";

const linkContext = `Le texte suivant est une transcription d'une vidéo YouTube. Résume les points clés du contenu parlé, en respectant le ton et l'intention du créateur. Fournis un titre pour le résumé qui reflète le sujet principal de la vidéo. Identifie les idées importantes, en particulier si elles sont explicatives, éducatives ou narratives. Si le domaine de la vidéo est connu (e.g., tutoriel, conférence, vlog), ajuste le résumé pour refléter ce style. Pour une vidéo longue, structure le résumé en plusieurs paragraphes équilibrés.`;

export async function POST(req: NextRequest) {
	try {
		const link = await req.json();

		if (!link) {
			return NextResponse.json(
				{ error: "Aucun lien fourni" },
				{ status: 400 }
			);
		}

		const data = await getVideoTranscription(link);
		const { content, title } = await generateContent(data, linkContext);

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
