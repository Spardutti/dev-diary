import { useGetTodos } from '@/features/todos/api/todosQueries';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TodoChart } from '@/features/todos/components/TodoChart';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from '@tanstack/react-router';

const today = dayjs();

const TodoStats = () => {
	const [timeRange, setTimeRange] = useState('90');
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/stats' });

	const { data: todos, isPending } = useGetTodos(
		`projectId=${projectId}&from=${today.subtract(Number(timeRange), 'day').toISOString()}&to=${today.toISOString()}&limit=200`,
	);

	const chartData = useMemo(() => {
		if (todos?.length > 0) {
			const dateCounts: Record<string, { created: number; completed: number }> = {};

			todos.forEach((todo) => {
				const date = dayjs(todo.createdAt).format('YYYY-MM-DD');

				if (!dateCounts[date]) {
					dateCounts[date] = { created: 0, completed: 0 };
				}

				dateCounts[date].created += 1;

				if (todo.completedAt) {
					dateCounts[date].completed += 1;
				}
			});

			const formattedData = Object.keys(dateCounts).map((date) => ({
				date: dayjs(date).format('YYYY-MM-DD'),
				created: dateCounts[date].created,
				completed: dateCounts[date].completed,
			}));

			return formattedData.sort((a, b) => a.date.localeCompare(b.date));
		}

		return [];
	}, [todos]);

	const totalCreated = chartData.reduce((sum, d) => sum + d.created, 0);
	const totalCompleted = chartData.reduce((sum, d) => sum + d.completed, 0);

	if (isPending) {
		return <Skely />;
	}

	return (
		<Card className="hover:border-green-900/60 ">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b border-b-primary py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Task Completion Trends</CardTitle>
					<CardDescription>Analyzing todo creation and completion rates over time</CardDescription>
				</div>
				<div className="md:flex-row flex-col flex gap-1">
					<div className="flex gap-4">
						<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
							<div className="text-xs text-green-400/70">Total Created</div>
							<div className="text-xl font-bold text-red-500">{totalCreated}</div>
						</div>
						<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
							<div className="text-xs text-green-400/70">Total Completed</div>
							<div className="text-xl font-bold text-green-500">{totalCompleted}</div>
						</div>
						<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
							<div className="text-xs text-green-400/70">Completion %</div>
							<div className="text-xl font-bold text-green-500">
								{totalCompleted > 0 || totalCreated > 0 ? `${Math.round((totalCompleted / totalCreated) * 100)}%` : 0}
							</div>
						</div>
					</div>
					<Select
						value={timeRange}
						onValueChange={setTimeRange}
					>
						<SelectTrigger
							className="w-[160px] rounded-lg sm:ml-auto"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem
								value="90"
								className="rounded-lg"
							>
								Last 3 months
							</SelectItem>
							<SelectItem
								value="30"
								className="rounded-lg"
							>
								Last 30 days
							</SelectItem>
							<SelectItem
								value="7"
								className="rounded-lg"
							>
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<TodoChart chartData={chartData} />
			</CardContent>
		</Card>
	);
};

export default TodoStats;

const Skely = () => (
	<Card className="hover:border-green-900/60 ">
		<CardHeader className="flex items-center gap-2 space-y-0 border-b border-b-primary py-5 sm:flex-row">
			<div className="grid flex-1 gap-1 text-center sm:text-left">
				<Skeleton className="h-6 max-w-[300px] min-w-3" />
				<Skeleton className="h-4 max-w-[400px] min-w-3" />
			</div>
			<div className="flex gap-1">
				<div className="flex gap-4">
					<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
						<div className="text-xs text-green-400/70">Total Created</div>
						<Skeleton className="h-7 w-10" />
					</div>
					<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
						<div className="text-xs text-green-400/70">Total Completed</div>
						<Skeleton className="h-7 w-10" />
					</div>
					<div className="bg-black/40 border border-green-900/50 rounded-md px-4 py-2">
						<div className="text-xs text-green-400/70">Completion %</div>
						<Skeleton className="h-7 w-10" />
					</div>
				</div>
				<Skeleton className="h-9 w-[160px]" />
			</div>
		</CardHeader>
		<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
			<Skeleton className="max-w-[1127px] h-[260px]" />
		</CardContent>
	</Card>
);
