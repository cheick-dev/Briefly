export const extractVideoId = (url: string): string | null => {
	const regex =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

export function truncateText(text: string, maxLength: number): string {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + "...";
	}
	return text;
}

export function cleanMarkdown(text: string): string {
	// Enlève les '**' des titres
	let cleanedText = text.replace(/\*\*(.*?)\*\*/g, "$1");

	// Enlève les '*' utilisés pour la mise en italique ou gras
	cleanedText = cleanedText.replace(/\*(.*?)\*/g, "$1");

	// Enlève les '#' des titres de niveau 1, 2, etc.
	cleanedText = cleanedText.replace(/^\#+\s*/gm, "");

	return cleanedText;
}
