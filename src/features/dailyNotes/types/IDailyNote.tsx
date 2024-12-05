export interface IDailyNote {
	note: string;
	date: string;
	readonly id: string;
}

export type IDailyNoteGroupedByMonth = Record<string, IDailyNote[]>;
