import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY!;

if (!apiKey) {
	throw new Error(
		"La clé API Google n'est pas définie. Ajoutez GOOGLE_API_KEY dans le fichier .env.local."
	);
}

// Initialisez le client
const genAI = new GoogleGenerativeAI(apiKey);

// Configurez le modèle
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (
	prompt: string,
	context: string,
	niveau: string
) => {
	const newPrompt = `
      ### Instruction:
      ${context}
      
Le résumé doit être clair, structuré et concis tout en assurant une fluidité dans l'écriture.
Fourni un titre pertinent qui reflète le contenu principal du texte.
Le résumé doit être limité à 150 mots, sauf indication contraire.
Si le texte est technique, préserve la précision des termes spécifiques tout en facilitant la compréhension globale.
Utilise du Markdown pour formater le résumé de manière optimale :
Titre principal (# Mon Titre)
Introduction courte (## Introduction)
Points clés en liste (- …)
Conclusion succincte (## Conclusion)
Mets en valeur les mots clés importants (**mot clé**).

      ### Prompt:
      ${prompt}

      ### Niveau de génération:
      Le résumé à trois niveaux de génération:
      - Court: pour une résumé court
      - Moyen: pour une résumé moyen
      - Long: pour une résumé long
      Générer un résumé de ${niveau}
      `;
	try {
		const result = await model.generateContent(newPrompt);
		const title = result.response.text().split("\n")[0];
		return {
			title,
			content: result.response.text().replace(title, ""),
		};
	} catch (error) {
		console.error("Erreur lors de la génération avec Gemini:", error);
		throw new Error("Impossible de générer du contenu avec Gemini.");
	}
};
