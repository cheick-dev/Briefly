"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/80 backdrop-blur-sm shadow-md"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="text-2xl font-bold">
					Briefly
				</Link>
				<nav className="hidden md:flex space-x-6">
					<Link
						href="#features"
						className="hover:text-primary transition-colors"
					>
						Fonctionnalités
					</Link>
					<Link
						href="#how-it-works"
						className="hover:text-primary transition-colors"
					>
						Comment ça marche
					</Link>
					<Link
						href="#contact"
						className="hover:text-primary transition-colors"
					>
						Contact
					</Link>
					<Link
						href="/login"
						className="hover:text-primary transition-colors"
					>
						Connexion
					</Link>
				</nav>
				<div className="flex gap-5">
					<div className="hidden md:block">
						<Button asChild>
							<Link href="/signup">Commencer gratuitement</Link>
						</Button>
					</div>
					<div className="hidden md:block ml-auto">
						<ThemeToggle />
					</div>
				</div>
				<button
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<Menu />
				</button>
			</div>
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden bg-background border-t"
					>
						<nav className="flex flex-col p-4 space-y-4">
							<Link
								href="#features"
								className="hover:text-primary transition-colors"
							>
								Fonctionnalités
							</Link>
							<Link
								href="#how-it-works"
								className="hover:text-primary transition-colors"
							>
								Comment ça marche
							</Link>
							<Link
								href="#contact"
								className="hover:text-primary transition-colors"
							>
								Contact
							</Link>
							<Link
								href="/login"
								className="hover:text-primary transition-colors"
							>
								Connexion
							</Link>
							<Button asChild>
								<Link href="/signup">
									Commencer gratuitement
								</Link>
							</Button>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
