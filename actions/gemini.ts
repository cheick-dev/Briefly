export const generateContent = async (text: string) => {
	try {
		const title = text.split("\n")[0];
		return {
			title,
			content: text.replace(title, ""),
		};
	} catch (error) {
		console.error("Erreur lors de la génération avec Gemini:", error);
		throw new Error("Impossible de générer du contenu avec Gemini.");
	}
};
