import { cleanMarkdown } from "@/utils";
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

export const generateContent = async (prompt: string, context: string) => {
	const newPrompt = `
      ### Instruction:
      ${context}
      
      ### Prompt:
      ${prompt}
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
