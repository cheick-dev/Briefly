"use client";

import { Summary } from "@/store";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "./ui/button";
import { cleanMarkdown, truncateText } from "@/utils";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SummaryCard({
	title,
	content,
	createdAt,
	sourceType,
	id,
}: Summary) {
	const { toast } = useToast();
	const router = useRouter();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="w-full font-bold px-2">
					{truncateText(cleanMarkdown(title), 30)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{truncateText(cleanMarkdown(title), 40)}
					</DialogTitle>
					<DialogDescription>
						{`${formatDistanceToNow(createdAt, {
							addSuffix: true,
							locale: fr,
						})} • ${sourceType} .`}
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-hidden p-3">
					<div className="pt-1 text-base">
						<div>{truncateText(content, 350)}</div>
					</div>
				</div>
				<DialogFooter>
					<div className="w-full flex justify-around">
						<Button
							variant={"outline"}
							className="font-bold px-2 mt-2"
							onClick={() => router.push(`/dashboard/${id}`)}
						>
							Voir plus
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
