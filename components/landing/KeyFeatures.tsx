"use client";

import { motion } from "framer-motion";
import {
	FileText,
	Headphones,
	FolderOpen,
	Share2,
	Paintbrush,
	Moon,
} from "lucide-react";

const features = [
	{
		icon: FileText,
		title: "Résumé instantané alimenté par IA",
		description: "Obtenez des résumés précis en quelques secondes.",
	},
	{
		icon: Headphones,
		title: "Support des fichiers : URL, PDF, audio",
		description: "Compatible avec divers formats pour plus de flexibilité.",
	},
	{
		icon: FolderOpen,
		title: "Organisation intuitive avec des collections",
		description:
			"Classez vos résumés facilement pour une meilleure gestion.",
	},
	{
		icon: Share2,
		title: "Partage rapide des résumés",
		description: "Partagez vos insights en un clic avec vos collègues.",
	},
	{
		icon: Paintbrush,
		title: "Design minimaliste et personnalisable",
		description: "Une interface épurée qui s adapte à vos préférences.",
	},
	{
		icon: Moon,
		title: "Mode clair/sombre",
		description:
			"Travaillez confortablement, quelle que soit l heure de la journée.",
	},
];

export default function KeyFeatures() {
	return (
		<section id="features" className="py-20 bg-muted">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Pourquoi choisir Briefly ?
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card p-6 rounded-lg shadow-md"
						>
							<feature.icon className="w-12 h-12 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								{feature.title}
							</h3>
							<p className="text-muted-foreground">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
