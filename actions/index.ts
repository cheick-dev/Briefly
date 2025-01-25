import PDFParser from "pdf2json";

export async function extractTextFromPDF(file: File) {
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const pdfParser = new PDFParser();

	// Promesse pour extraire le texte
	const parsePDF = () =>
		new Promise<string>((resolve, reject) => {
			pdfParser.on("pdfParser_dataError", (errData: any) => {
				reject(errData.parserError);
			});

			pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
				const formattedText = formatText(pdfData);
				resolve(formattedText);
			});

			pdfParser.parseBuffer(fileBuffer);
		});

	// Extraire le texte
	const extractedText = await parsePDF();
	return extractedText;
}

function formatText(pdfData: any): string {
	let formattedText = "";
	let lastTextBottom = -1;
	let lastTextTop = -1; // Ajouter cette variable pour gérer la position du haut du texte
	let pageCount = 1;

	pdfData.Pages.forEach((page: any, pageIndex: number) => {
		// Ajouter un titre pour la page
		formattedText += `Page ${pageCount}\n`;
		pageCount++;

		page.Texts.forEach((text: any) => {
			text.R.forEach((textRun: any) => {
				const decodedText = decodeURIComponent(textRun.T)
					.replace(/\s+/g, " ")
					.trim();

				// Vérification de l'existence de BBox avant d'accéder à ses propriétés
				if (
					text.BBox &&
					Array.isArray(text.BBox) &&
					text.BBox.length > 3
				) {
					const currentTextBottom = text.BBox[3]; // Position Y du bas du texte
					const currentTextTop = text.BBox[1]; // Position Y du haut du texte

					// Si le texte est plus bas que le texte précédent, c'est une nouvelle ligne
					if (
						lastTextBottom !== -1 &&
						currentTextTop < lastTextBottom - 5
					) {
						formattedText += "\n"; // Ajout d'un saut de ligne
					}

					// Ajouter le texte formaté
					formattedText += decodedText;

					// Mettre à jour la position du bas et du haut du texte
					lastTextBottom = currentTextBottom;
					lastTextTop = currentTextTop;
				} else {
					// Si BBox n'est pas valide, ajouter simplement le texte
					formattedText += decodedText;
				}
			});
		});

		// Ajouter un saut de ligne entre les pages
		formattedText += "\n";
	});

	return formattedText;
}
