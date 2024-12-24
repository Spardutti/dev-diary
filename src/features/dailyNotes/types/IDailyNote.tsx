export interface IDailyNote {
	note: string;
	date: string;
	readonly id: string;
	readonly projectId: string;
}

export type IDailyNoteGroupedByMonth = Record<string, IDailyNote[]>;
