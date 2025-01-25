"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
	onUpload: (content: FormData) => Promise<void>;
}

const ALLOWED_MIME_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

export function FileUploader({ onUpload }: FileUploaderProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const { toast } = useToast();

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (!file) return;
			if (!ALLOWED_MIME_TYPES.includes(file.type))
				return toast({
					title: "Échec du chargement",
					description:
						"Type de fichier non supporté. Veuillez choisir un fichier PDF, DOC, DOCX ou TXT.",
					variant: "destructive",
				});

			setIsUploading(true);
			setProgress(0);
			const formData = new FormData();
			formData.append("file", file);

			try {
				await onUpload(formData);
				toast({
					title: "Fichier téléchargé avec succès",
					description: "Votre contenu est prêt à être résumé.",
				});
			} catch (error) {
				toast({
					title: "Échec du téléchargement",
					description:
						"Une erreur s'est produite lors du téléchargement de votre fichier.",
					variant: "destructive",
				});
			} finally {
				setIsUploading(false);
				setProgress(0);
			}
		},
		[onUpload, toast]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"text/plain": [".txt"],
			"application/pdf": [".pdf"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
		},
		maxFiles: 1,
		disabled: isUploading,
	});

	return (
		<div
			{...getRootProps()}
			className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center gap-4">
				<Upload className="h-10 w-10 text-muted-foreground" />
				{isDragActive ? (
					<p className="text-lg">Déposez le fichier ici...</p>
				) : (
					<>
						<p className="text-lg">
							Glissez-déposez un fichier ici, ou cliquez pour
							sélectionner
						</p>
						<p className="text-sm text-muted-foreground">
							Supporte les fichiers PDF, DOC, DOCX et TXT
						</p>
					</>
				)}
				{isUploading && (
					<div className="w-full max-w-xs">
						<Progress value={progress} className="h-2" />
					</div>
				)}
				<Button disabled={isUploading}>
					{isUploading ? "Génération..." : "Sélectionner un fichier"}
				</Button>
			</div>
		</div>
	);
}

// async function readFileContent(
// 	file: File,
// 	onProgress: (progress: number) => void
// ): Promise<string> {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();

// 		reader.onload = (event) => {
// 			resolve(event.target?.result as string);
// 		};

// 		reader.onerror = () => {
// 			reject(new Error("Failed to read file"));
// 		};

// 		reader.onprogress = (event) => {
// 			if (event.lengthComputable) {
// 				const progress = (event.loaded / event.total) * 100;
// 				onProgress(progress);
// 			}
// 		};

// 		reader.readAsText(file);
// 	});
// }
