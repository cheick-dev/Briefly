import Link from "next/link";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	CallToAction,
	Footer,
	Header,
	HeroSection,
	HowItWorks,
	KeyFeatures,
	Showcase,
	Testimonials,
} from "@/components/landing";

export default function Home() {
	return (
		<>
			<div className="flex min-h-[calc(100vh-4rem)] container mx-auto flex-col items-center justify-center px-4 text-center">
				<div className="max-w-3xl space-y-6">
					<div className="flex justify-center">
						<Book className="h-16 w-16" />
					</div>
					<h1 className="text-4xl font-bold sm:text-6xl">
						Transform Content into
						<span className="text-primary"> Concise Summaries</span>
					</h1>
					<p className="text-lg text-muted-foreground sm:text-xl">
						Upload articles, PDFs, or any content and get AI-powered
						summaries tailored for tech enthusiasts. Save time while
						staying informed.
					</p>
					<div className="flex justify-center gap-4">
						<Button asChild size="lg">
							<Link href="/dashboard">Get Started</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link href="#features">Learn More</Link>
						</Button>
					</div>
				</div>
			</div>
			{/* <FileUploader /> */}
			{/* <div className="min-h-screen bg-background text-foreground">
				<Header />
				<main>
					<HeroSection />
					<KeyFeatures />
					<HowItWorks />
					<Showcase />
					<Testimonials />
					<CallToAction />
				</main>
				<Footer />
			</div> */}
		</>
	);
}
