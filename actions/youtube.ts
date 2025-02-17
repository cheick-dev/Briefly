import { YoutubeTranscript } from "youtube-transcript";

export async function getVideoTranscription(videoUrl: string) {
	try {
		const yt = await YoutubeTranscript.fetchTranscript(videoUrl);
		const transcript = yt.map((item) => item.text).join(" ");
		return transcript;
	} catch (error) {
		throw new Error("Impossible de récupérer la transcription.");
		// return null;
	}
}
