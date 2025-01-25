"use client";

import { useState } from "react";
import { FileUploader } from "@/components/file-uploader";
import { SummaryCard } from "@/components/summary-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useSummaryStore } from "@/store";

export default function DashboardPage() {
	const [isGenerating, setIsGenerating] = useState(false);
	const { toast } = useToast();
	const [link, setLink] = useState("");
	const [textContent, setTextContent] = useState("");
	const { addSummary, summaries } = useSummaryStore();

	const handleUpload = async (content: FormData) => {
		setIsGenerating(true);
		try {
			const response = await fetch("/api/summarize/doc", {
				method: "POST",
				body: content,
			});

			if (!response.ok) throw new Error("Failed to generate summary");

			const data = await response.json();

			addSummary({
				content: data.content,
				title: data.title,
				sourceType: "document",
				sourceDetail: textContent,
			});

			toast({
				title: "Résumé généré",
				description: data.message,
			});

			// TODO: Save summary to Supabase
		} catch (error) {
			toast({
				title: "Erreur",
				description:
					"Échec de la génération du résumé. Veuillez réessayer.",
				variant: "destructive",
			});
		} finally {
			setIsGenerating(false);
		}
	};

	const handlePost = async (trigger: "text" | "link") => {
		setIsGenerating(true);
		try {
			const response =
				trigger === "link"
					? await fetch("/api/summarize/link", {
							method: "POST",
							body: JSON.stringify(link),
					  })
					: await fetch("/api/summarize/text", {
							method: "POST",
							body: JSON.stringify(textContent),
					  });

			if (!response.ok)
				throw new Error("Échec de la génération du résumé");

			const data = await response.json();

			addSummary({
				content: data.content,
				title: data.title,
				sourceType: trigger,
				sourceDetail: textContent,
			});
			setTextContent("");
			setLink("");

			toast({
				title: "Résumé généré",
				description: data.message,
			});

			// TODO: Save summary to Supabase
		} catch (error) {
			toast({
				title: "Erreur",
				description:
					"Échec de la génération du résumé. Veuillez réessayer.",
				variant: "destructive",
			});
			setTextContent("");
			setLink("");
		} finally {
			setIsGenerating(false);
			setTextContent("");
			setLink("");
		}
	};

	return (
		<div className="container mx-auto py-8">
			<div className="grid gap-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">Dashboard</h1>
					<p className="text-muted-foreground">
						Charge et génère des résumés automatisés avec l'IA.
					</p>
				</div>

				<Card className="p-6 ">
					<Tabs defaultValue="upload">
						<TabsList>
							<TabsTrigger value="upload">
								Charger du contenu
							</TabsTrigger>
							<TabsTrigger value="paste">
								Coller du texte brute
							</TabsTrigger>
							<TabsTrigger value="link">Lien youtube</TabsTrigger>
						</TabsList>
						<TabsContent value="upload" className="mt-4">
							<FileUploader onUpload={handleUpload} />
						</TabsContent>
						<TabsContent value="paste" className="mt-4">
							<textarea
								className="w-full h-48 p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Collez votre contenu ici..."
								onChange={(e) => setTextContent(e.target.value)}
								value={textContent}
							/>
							<Button
								className="mt-4"
								disabled={isGenerating}
								onClick={() => handlePost("text")}
							>
								{isGenerating
									? "Génération..."
									: "Générer le résumé"}
							</Button>
						</TabsContent>
						<TabsContent value="link" className="mt-4">
							<Input
								placeholder="Collez votre lien ici..."
								type="url"
								onChange={(e) => setLink(e.target.value)}
								value={link}
							/>
							<Button
								className="mt-4"
								disabled={isGenerating}
								onClick={() => handlePost("link")}
							>
								{isGenerating
									? "Génération..."
									: "Générer le résumé"}
							</Button>
						</TabsContent>
					</Tabs>
				</Card>

				<div>
					<h2 className="text-2xl font-bold mb-4 text-center">
						Résumés récents
					</h2>
					<>
						{summaries.length !== 0 ? (
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{summaries.map((summary) => (
									<SummaryCard
										id={summary.id}
										key={summary.id}
										title={summary.title}
										content={summary.content}
										createdAt={summary.createdAt}
										sourceType={summary.sourceType}
									/>
								))}
							</div>
						) : (
							<p className="text-2xl font-semibold text-center text-red-500">
								Pas de résumé trouvé
							</p>
						)}
					</>
				</div>
			</div>
		</div>
	);
}
