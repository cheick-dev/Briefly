import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { downloadAsPDF } from "@/lib/downloadAs";

export const convertToPdf = async (
	file: Blob,
	fileType: string
): Promise<File> => {
	if (fileType.includes("wordprocessingml.document")) {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const text = (await mammoth.extractRawText({ buffer })).value;
		const pdf = downloadAsPDF(text);
		return new File([pdf], "converted.pdf", { type: "application/pdf" });
		// new Blob([text], { type: "application/pdf" });
	}

	if (fileType.includes("spreadsheetml.sheet")) {
		const arrayBuffer = await file.arrayBuffer();
		const workbook = XLSX.read(arrayBuffer, { type: "array" });
		const sheet = XLSX.utils.sheet_to_csv(
			workbook.Sheets[workbook.SheetNames[0]]
		);
		const pdf = downloadAsPDF(sheet);
		return new File([pdf], "converted.pdf", { type: "application/pdf" });
		// new Blob([sheet], { type: "application/pdf" });
	}

	if (fileType.includes("text/plain")) {
		const pdf = downloadAsPDF(await file.text());
		return new File([pdf], "converted.pdf", {
			type: "application/pdf",
		});
	}
	const pdf = downloadAsPDF(await file.text());
	return new File([pdf], "converted.pdf", { type: "application/pdf" });
};
