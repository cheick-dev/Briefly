import * as XLSX from "xlsx";
import mammoth from "mammoth";
import puppeteer from "puppeteer";
import fs, { unlink } from "fs";

export async function convertWordToPdf(
	wordPath: string,
	outputPath: string
): Promise<string> {
	// Extraction du texte brut depuis le fichier Word
	const result = await mammoth.convertToHtml({ path: wordPath });
	const htmlContent = result.value; // Contenu HTML extrait du fichier Word

	// Utilisation de Puppeteer pour générer un PDF à partir du contenu HTML
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(htmlContent);
	const pdfPath = `${outputPath}/output.pdf`;
	await page.pdf({ path: pdfPath, format: "A4" });
	await browser.close();

	unlink(wordPath, () => {});

	return pdfPath;
}

export async function convertExcelToPdf(
	excelPath: string,
	outputPath: string
): Promise<string> {
	// Lecture du fichier Excel et conversion en une feuille HTML
	const workbook = XLSX.readFile(excelPath);
	const sheetName = workbook.SheetNames[0]; // Prend la première feuille
	const sheet = workbook.Sheets[sheetName];
	const htmlContent = XLSX.utils.sheet_to_html(sheet);

	// Utilisation de Puppeteer pour générer un PDF à partir du contenu HTML
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(htmlContent);
	const pdfPath = `${outputPath}/output.pdf`;
	await page.pdf({ path: pdfPath, format: "A4" });
	await browser.close();
	unlink(excelPath, () => {});
	return pdfPath;
}

export async function convertTxtToPdf(
	txtPath: string,
	outputPath: string
): Promise<string> {
	// Lire le contenu du fichier TXT
	const txtContent = fs.readFileSync(txtPath, "utf-8");

	// Utilisation de Puppeteer pour générer un PDF à partir du contenu HTML
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(txtContent);
	const pdfPath = `${outputPath}/output.pdf`;
	await page.pdf({ path: pdfPath, format: "A4" });
	await browser.close();
	unlink(txtPath, () => {});
	return pdfPath;
}
