import { extractVideoId } from "@/utils";
import { YoutubeTranscript } from "youtube-transcript";

export async function getVideoTranscription(videoUrl: string) {
	try {
		const videoId = extractVideoId(videoUrl);
		if (!videoId) {
			throw new Error("Invalid video URL");
		}
		const yt = await YoutubeTranscript.fetchTranscript(videoId);
		const transcript = yt.map((item) => item.text).join(" ");

		return transcript;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de la transcription :",
			error
		);
		throw new Error("Impossible de récupérer la transcription.");
	}
}
