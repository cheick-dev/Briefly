"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
	{
		name: "Sophie M.",
		role: "Étudiante en master",
		content:
			"Briefly m'a aidé à condenser mes cours de manière incroyable. Je gagne tellement de temps dans mes révisions !",
		rating: 5,
	},
	{
		name: "Thomas L.",
		role: "Chef de projet",
		content:
			"Un outil indispensable pour résumer rapidement des rapports longs. Mes présentations sont désormais beaucoup plus efficaces.",
		rating: 5,
	},
	{
		name: "Emma R.",
		role: "Journaliste",
		content:
			"Briefly me permet de rester à jour sur de nombreux sujets en résumant rapidement les longs articles. Un gain de temps précieux !",
		rating: 4,
	},
];

export default function Testimonials() {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentTestimonial(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length
		);
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Ils ont essayé Briefly, voici ce qu'ils en disent :
				</h2>
				<div className="relative">
					<div className="flex justify-between items-center mb-4">
						<Button
							variant="outline"
							size="icon"
							onClick={prevTestimonial}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={nextTestimonial}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentTestimonial}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										<Avatar className="h-12 w-12 mr-4">
											<AvatarImage
												src={`https://i.pravatar.cc/150?u=${testimonials[currentTestimonial].name}`}
											/>
											<AvatarFallback>
												{
													testimonials[
														currentTestimonial
													].name[0]
												}
											</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="font-semibold">
												{
													testimonials[
														currentTestimonial
													].name
												}
											</h3>
											<p className="text-sm text-muted-foreground">
												{
													testimonials[
														currentTestimonial
													].role
												}
											</p>
										</div>
									</div>
									<p className="mb-4">
										{
											testimonials[currentTestimonial]
												.content
										}
									</p>
									<div className="flex">
										{[
											...Array(
												testimonials[currentTestimonial]
													.rating
											),
										].map((_, i) => (
											<Star
												key={i}
												className="h-5 w-5 text-yellow-400 fill-current"
											/>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
