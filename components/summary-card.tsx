"use client";
import {
	Disclosure,
	DisclosureContent,
	DisclosureTrigger,
} from "@/components/ui/disclosure";
import { Summary } from "@/store";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "./ui/button";
import { truncateText } from "@/utils";

export function SummaryCard({
	title,
	content,
	createdAt,
	sourceType,
}: Summary) {
	return (
		<Disclosure className="w-[90%] mx-auto">
			<DisclosureTrigger>
				<Button variant={"outline"} className="w-full font-bold px-2">
					{truncateText(title, 40)}
				</Button>
			</DisclosureTrigger>
			<DisclosureContent>
				<div className="overflow-hidden p-3">
					<div className="pt-1 text-base">
						<p className="text-muted-foreground mb-2">
							{`${formatDistanceToNow(createdAt, {
								addSuffix: true,
								locale: fr,
							})} • ${sourceType} .`}
						</p>
						<div>{truncateText(content, 350)}</div>
					</div>
				</div>
			</DisclosureContent>
		</Disclosure>
	);
}
