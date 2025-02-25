import type { ITodo } from '@/features/todos/types/ITodo';

export interface ISummary {
	id: string;
	completedTodos: ITodo[];
	createdTodos: ITodo[];
	projectId: string;
	createdAt: string;
	updatedAt: string;
}
