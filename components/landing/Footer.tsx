import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-muted py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">Briefly</h3>
						<p className="text-sm text-muted-foreground">
							Résumez tout, rapidement et intelligemment.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Liens rapides
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-sm hover:text-primary transition-colors"
								>
									À propos
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-sm hover:text-primary transition-colors"
								>
									Politique de confidentialité
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-sm hover:text-primary transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Suivez-nous
						</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<Facebook className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<Twitter className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<Instagram className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<Linkedin className="h-6 w-6" />
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
					<p className="text-sm text-muted-foreground">
						© 2025 Briefly. Tous droits réservés.
					</p>
				</div>
			</div>
		</footer>
	);
}
