"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Share } from "lucide-react";

const steps = [
	{
		icon: Upload,
		title: "Téléchargez ou importez du contenu",
		description:
			"Ajoutez facilement vos fichiers PDF, liens URL ou contenus audio.",
	},
	{
		icon: Brain,
		title: "Générez un résumé personnalisé",
		description:
			"Notre IA analyse et condense l essentiel de votre contenu.",
	},
	{
		icon: Share,
		title: "Sauvegardez et partagez",
		description: "Organisez vos résumés et partagez-les en un clic.",
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Comment ça fonctionne ?
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="flex flex-col items-center text-center"
						>
							<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
								<step.icon className="w-10 h-10 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								{step.title}
							</h3>
							<p className="text-muted-foreground">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
