import { create } from 'zustand';

interface IDailyNoteState {
	id: string;
	setDailyNoteId: (id: string) => void;
}

export const useDailyNoteStore = create<IDailyNoteState>((set) => ({
	id: '',
	setDailyNoteId: (id) => set(() => ({ id })),
}));
