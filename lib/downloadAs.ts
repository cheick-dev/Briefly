import { cleanMarkdown } from "@/utils";
import jsPDF from "jspdf";

export const downloadAsPDF = (markdown: string, title: string) => {
	const pdf = new jsPDF({
		orientation: "p", // Portrait
		unit: "mm",
		format: "a4",
	});
	const marginLeft = 15;
	const marginTop = 20;
	const pageWidth = pdf.internal.pageSize.getWidth();
	const pageHeight = pdf.internal.pageSize.getHeight();
	// Ajout du titre
	pdf.setFont("helvetica", "bold");
	pdf.setFontSize(18);
	pdf.text(title, marginLeft, marginTop);

	// Ajustement du texte principal
	pdf.setFont("helvetica", "normal");
	pdf.setFontSize(12);

	const maxWidth = pageWidth - 2 * marginLeft; // Largeur du texte
	const formattedText = pdf.splitTextToSize(markdown, maxWidth);
	let y = marginTop + 10; // Position de départ

	formattedText.forEach((line: string, index: number) => {
		if (y + 10 > pageHeight - 10) {
			pdf.addPage();
			y = marginTop;
		}
		pdf.text(line, marginLeft, y);
		y += 7;
	});

	pdf.save(`${title ? cleanMarkdown(title) : "Résumé"}.pdf`);
	return {
		title: "Résumé enregistré",
		description: "Résumé enregistré",
	};
};
export const copyToClipboard = async (markdown: string) => {
	try {
		await navigator.clipboard.writeText(markdown);
		return {
			title: "Résumé enregistré",
			description: "Résumé enregistré",
			variant: null,
		};
	} catch (err) {
		return {
			title: "Erreur",
			description: `Erreur lors de la copie :, ${err}`,
			variant: "destructive",
		};
	}
};
