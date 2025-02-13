export interface ITodo {
	title: string;
	description: string;
	readonly id: string;
	status: boolean;
	readonly projectId: string;
}
