import { create } from "zustand";

export interface Summary {
	id: string;
	title: string;
	content: string;
	sourceType: "text" | "document" | "link"; // Type de la source
	sourceDetail?: string; // Détails supplémentaires (nom du fichier, URL, etc.)
	createdAt: Date;
}

interface SummaryStore {
	summaries: Summary[];
	addSummary: (summary: Omit<Summary, "id" | "createdAt">) => void;
	updateSummary: (id: string, updatedContent: Partial<Summary>) => void;
	deleteSummary: (id: string) => void;
	getSummaryById: (id: string) => Summary | undefined;
}

export const useSummaryStore = create<SummaryStore>((set, get) => ({
	summaries: [],

	addSummary: (summary) => {
		const newSummary: Summary = {
			...summary,
			id: crypto.randomUUID(), // Génère un ID unique
			createdAt: new Date(),
		};
		set((state) => ({ summaries: [newSummary, ...state.summaries] }));
	},

	updateSummary: (id, updatedContent) => {
		set((state) => ({
			summaries: state.summaries.map((summary) =>
				summary.id === id ? { ...summary, ...updatedContent } : summary
			),
		}));
	},

	deleteSummary: (id) => {
		set((state) => ({
			summaries: state.summaries.filter((summary) => summary.id !== id),
		}));
	},

	getSummaryById: (id) => {
		return get().summaries.find((summary) => summary.id === id);
	},
}));
