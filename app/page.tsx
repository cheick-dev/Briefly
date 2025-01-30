import Link from "next/link";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextLoop } from "@/components/ui/text-loop";
import { Magnetic } from "@/components/ui/magnetic";

export default function Home() {
	return (
		<>
			<div className="flex min-h-[calc(100vh-4rem)] container mx-auto flex-col items-center justify-center px-4 text-center">
				<div className="max-w-4xl space-y-6">
					<div className="flex justify-center">
						<Book className="h-16 w-16" />
					</div>
					<h1 className="text-3xl font-bold sm:text-6xl">
						Transformez vos contenus en{" "}
						<span className="text-primary">
							résumés instantanés.
						</span>
					</h1>
					<div className="text-lg text-muted-foreground sm:text-xl">
						<TextLoop className="text-primary text-2xl">
							<span>Articles ?</span>
							<span>Documents(PDFs, Word, Excel et Txt) ?</span>
							<span>Liens YouTube ?</span>
						</TextLoop>
						<br />
						Briefly résume ces contenus en un seul clic grâce à
						l'IA.
					</div>
					<div className="flex justify-center gap-4">
						<Magnetic>
							<Button asChild size="lg">
								<Link href="/dashboard">Allons-y !</Link>
							</Button>
						</Magnetic>
					</div>
				</div>
			</div>
		</>
	);
}
