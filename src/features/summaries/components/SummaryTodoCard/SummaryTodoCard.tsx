import CopyToClipboard from '@/components/CopyIcon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ITodo } from '@/features/todos/types/ITodo';
import type { ReactNode } from '@tanstack/react-router';

interface SummaryTodoCardProps {
	title: string;
	todos: ITodo[];
	icon: ReactNode;
	todoIcon: ReactNode;
}

const SummaryTodoCard = ({ title, todos, icon, todoIcon }: SummaryTodoCardProps) => {
	const stringValue = todos.map((todo) => `- ${todo.title}`).join('\n');

	return (
		<Card className="border-none backdrop-blur">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="flex items-center gap-2 text-xl">
					{icon}
					{title}
					<CopyToClipboard
						size={18}
						value={stringValue}
					/>
				</CardTitle>
				<Badge>{todos.length}</Badge>
			</CardHeader>
			<CardContent className="space-y-4">
				{todos.map((todo, index) => (
					<div
						key={todo.id ?? `fallback ${index}`}
						className="flex items-start gap-2 rounded-lg border border-green-900/60 bg-background/50 p-3 backdrop-blur"
					>
						{todoIcon}
						<p className="text-sm">{todo.title}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default SummaryTodoCard;
