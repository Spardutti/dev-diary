import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SummaryProgressProps {
	completedTodos: number;
	createdTodos: number;
}

const SummaryProgress = ({ completedTodos, createdTodos }: SummaryProgressProps) => {
	const totalTasks = completedTodos + createdTodos;
	const progress = (completedTodos / totalTasks) * 100;
	return (
		<Card className="border-none bg-background-alt backdrop-blur">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle>Daily Progress</CardTitle>
					<Badge variant="secondary">
						{completedTodos}/{totalTasks} Tasks
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<Progress
					value={progress}
					className="h-2"
				/>
			</CardContent>
		</Card>
	);
};

export default SummaryProgress;
