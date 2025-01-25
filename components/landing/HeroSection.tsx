"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="py-20 md:py-32">
			<div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Résumez tout, rapidement et intelligemment.
					</h1>
					<p className="text-xl mb-8">
						Que ce soit un article, un podcast ou un fichier PDF,
						laissez Briefly condenser l'essentiel pour vous.
					</p>
					<Button size="lg" asChild>
						<a href="#cta">Essayez gratuitement</a>
					</Button>
					<p className="mt-4 text-sm text-muted-foreground">
						Aucun paiement requis
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Image
						src="/placeholder.svg"
						alt="Briefly interface"
						width={600}
						height={400}
						className="rounded-lg shadow-2xl"
					/>
				</motion.div>
			</div>
		</section>
	);
}
