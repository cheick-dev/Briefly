"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useCases = [
	{
		title: "Étudiants",
		description: "Résumez vos cours et gagnez du temps dans vos révisions.",
	},
	{
		title: "Professionnels",
		description:
			"Condensez rapidement des rapports longs pour des présentations efficaces.",
	},
	{
		title: "Lecteurs passionnés",
		description:
			"Obtenez l essentiel d articles longs sans perdre les points clés.",
	},
];

const examples = [
	{
		original: "Long contenu original...",
		summary: "Résumé concis et pertinent...",
	},
	{
		original: "Autre contenu original...",
		summary: "Autre résumé concis...",
	},
	{
		original: "Troisième contenu original...",
		summary: "Troisième résumé concis...",
	},
];

export default function Showcase() {
	const [currentExample, setCurrentExample] = useState(0);

	const nextExample = () => {
		setCurrentExample((prev) => (prev + 1) % examples.length);
	};

	const prevExample = () => {
		setCurrentExample(
			(prev) => (prev - 1 + examples.length) % examples.length
		);
	};

	return (
		<section className="py-20 bg-muted">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Pour qui ? Pour quoi ?
				</h2>
				<div className="grid md:grid-cols-3 gap-8 mb-12">
					{useCases.map((useCase, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-2">
										{useCase.title}
									</h3>
									<p className="text-muted-foreground">
										{useCase.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
				<div className="relative">
					<h3 className="text-2xl font-bold text-center mb-6">
						Voyez la différence
					</h3>
					<div className="flex justify-between items-center mb-4">
						<Button
							variant="outline"
							size="icon"
							onClick={prevExample}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={nextExample}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
					<motion.div
						key={currentExample}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="grid md:grid-cols-2 gap-8"
					>
						<Card>
							<CardContent className="p-6">
								<h4 className="font-semibold mb-2">
									Contenu original
								</h4>
								<p>{examples[currentExample].original}</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h4 className="font-semibold mb-2">
									Résumé Briefly
								</h4>
								<p>{examples[currentExample].summary}</p>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
