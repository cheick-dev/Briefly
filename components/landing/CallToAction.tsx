"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CallToAction() {
	return (
		<section id="cta" className="py-20 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl font-bold mb-6">
							Prêt à résumer votre premier contenu ?
						</h2>
						<div className="space-y-4 md:space-y-0 md:space-x-4">
							<Button size="lg" variant="secondary" asChild>
								<a href="/signup">Commencer maintenant</a>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<a href="#features">En savoir plus</a>
							</Button>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Image
							src="/placeholder.svg"
							alt="Briefly app screenshot"
							width={600}
							height={400}
							className="rounded-lg shadow-2xl"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
