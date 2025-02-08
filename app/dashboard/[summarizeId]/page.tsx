"use client";
import { Button } from "@/components/ui/button";
import { copyToClipboard, downloadAsPDF } from "@/lib/downloadAs";
import { useSummaryStore } from "@/store";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Book, Copy, FileDown } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { cleanMarkdown } from "@/utils";

export default function Page({ params }: { params: { summarizeId: string } }) {
	const summarizeId = params.summarizeId;
	const { getSummaryById } = useSummaryStore();
	const { toast } = useToast();
	const source = getSummaryById(summarizeId);
	return (
		<div className="w-[70%] mx-auto py-8">
			<div className="flex mb-4 justify-between">
				<Button
					variant={"outline"}
					className="font-bold px-2 mt-2"
					onClick={() =>
						downloadAsPDF(
							source?.content || "",
							source?.title || ""
						)
					}
				>
					<FileDown />
					Télécharger en PDF
				</Button>
				<Button
					variant={"outline"}
					className="font-bold px-2 mt-2"
					onClick={async () => {
						const res = await copyToClipboard(
							source?.content || ""
						);
						toast({
							title: res.title,
							description: res.description,
						});
					}}
				>
					<Copy />
					Copier
				</Button>
			</div>
			<>
				<h1 className="text-3xl font-bold mb-4">
					{cleanMarkdown(source?.title || "")}
				</h1>

				<MarkdownPreview
					source={source?.content}
					style={{
						padding: 22,
						backgroundColor: "#f5f5f5",
						color: "#333",
					}}
					disableCopy={true}
				/>
			</>
		</div>
	);
}
