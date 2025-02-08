import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// 📌 Détermine le dossier de stockage (local ou temporaire)
const UPLOADS_DIR =
	process.env.NODE_ENV === "production"
		? "/tmp/uploads"
		: path.join(process.cwd(), "uploads");

// 📌 Fonction pour sauvegarder un fichier
export async function saveFileLocally(fileName: string, fileBuffer: Buffer) {
	try {
		// Crée le dossier s'il n'existe pas
		if (!fs.existsSync(UPLOADS_DIR)) {
			await mkdir(UPLOADS_DIR, { recursive: true });
		}

		const filePath = path.join(UPLOADS_DIR, fileName);
		await writeFile(filePath, new Uint8Array(fileBuffer));

		return filePath;
	} catch (error) {
		console.error("Erreur lors de l'enregistrement du fichier:", error);
		throw new Error("Impossible de sauvegarder le fichier.");
	}
}
