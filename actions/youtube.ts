import { extractVideoId } from "@/utils";
import { YoutubeTranscript } from "youtube-transcript";

export async function getVideoTranscription(videoUrl: string) {
	try {
		const yt = await YoutubeTranscript.fetchTranscript(videoUrl);
		const transcript = yt.map((item) => item.text).join(" ");
		// console.log(transcript);

		return transcript;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de la transcription :",
			error
		);
		throw new Error("Impossible de récupérer la transcription.");
	}
}
