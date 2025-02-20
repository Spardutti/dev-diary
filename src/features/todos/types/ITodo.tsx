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
	0: 'bg-background-alt hover:bg-background/60',
	1: 'bg-priority-low hover:bg-priority-low-hover',
	2: 'bg-priority-mid hover:bg-priority-mid-hover',
	3: 'bg-priority-high hover:bg-priority-high-hover',
};
