export interface INote {
	content: string;
	title: string;
	createdAt: Date;
	readonly id: string;
	readonly projectId: string;
}

export type IDailyNoteGroupedByMonth = Record<string, INote[]>;
