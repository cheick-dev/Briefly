import { google } from "@ai-sdk/google";
import { generateText } from "ai";
// import fs from "fs";

export const summarizePdf = async (
	filePath: string,
	context: string,
	level: string
) => {
	const newPrompt = `${context}.Le résumé doit être clair, structuré et ${level} tout en assurant une fluidité dans l'écriture.
    Fourni un titre pertinent qui reflète le contenu principal du texte.
    Si le texte est technique, préserve la précision des termes spécifiques tout en facilitant la compréhension globale.
    Utilise du Markdown pour formater le résumé de manière optimale :
    Titre principal (# Mon Titre)
    Introduction courte (## Introduction)
    Points clés en liste (- …)
    Conclusion succincte (## Conclusion)
    Mets en valeur les mots clés importants (**mot clé**).`;

	const result = await generateText({
		model: google("gemini-1.5-flash"),
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: newPrompt,
					},
					{
						type: "file",
						data: filePath,
						mimeType: `application/pdf`,
					},
				],
			},
		],
	});
	return result.text;
};

export const summarizeText = async (
	text: string,
	context: string,
	level: string
) => {
	const newPrompt = `${context}.Le résumé doit être clair, structuré et ${level} tout en assurant une fluidité dans l'écriture.
    Fourni un titre pertinent qui reflète le contenu principal du texte.
    Si le texte est technique, préserve la précision des termes spécifiques tout en facilitant la compréhension globale.
    Utilise du Markdown pour formater le résumé de manière optimale :
    Titre principal (# Mon Titre)
    Introduction courte (## Introduction)
    Points clés en liste (- …)
    Conclusion succincte (## Conclusion)
    Mets en valeur les mots clés importants (**mot clé**).
    
    En voici le texte : ${text}
    `;

	const result = await generateText({
		model: google("gemini-1.5-flash"),
		prompt: newPrompt,
	});
	return result.text;
};
