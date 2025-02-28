export interface ITodo {
	title: string;
	description: string;
	readonly id: string;
	status: boolean;
	readonly projectId: string;
	priority: number;
	completedAt: Date | null;
	createdAt: Date;
}

export const todoPriorityColors = {
	0: 'px-2 py-1 bg-gray-800 text-xs rounded border border-green-900/60',
	1: 'px-2 py-1 bg-green-900/40 text-xs rounded border border-green-900/60',
	2: 'px-2 py-1 bg-yellow-900/40 text-xs rounded border border-green-900/60',
	3: 'px-2 py-1 bg-red-900/40 text-xs rounded border border-green-900/60',
};
