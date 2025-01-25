import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Briefly - Résumez tout, rapidement et intelligemment",
	description:
		"Briefly vous aide à résumer rapidement et intelligemment vos articles, podcasts et fichiers PDF.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="min-h-screen bg-background">
							<Navbar />
							<main>{children}</main>
							<Toaster />
						</div>
					</ThemeProvider>
				</body>
			</html> */}
			<html lang="fr" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
