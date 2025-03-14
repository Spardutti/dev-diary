import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetTodos } from '@/features/todos/api/todosQueries';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const chartConfig = {
	completed: {
		label: 'Completed',
		color: '#25632b',
	},
	created: {
		label: 'Created',
		color: '#60a5ad',
	},
} satisfies ChartConfig;

const today = dayjs();
const oneMonthAgo = today.subtract(1, 'month');
const TodoChart = () => {
	const { data: todos } = useGetTodos(`from=${oneMonthAgo.toISOString()}&to=${today.toISOString()}&limit=200`);
	console.log(' todos:', todos);

	const chartData = useMemo(() => {
		if (todos?.length > 0) {
			// Initialize an object to store the counts for each date
			const dateCounts: Record<string, { created: number; completed: number }> = {};

			todos.forEach((todo) => {
				const date = dayjs(todo.createdAt).format('YYYY-MM-DD');

				// Initialize the date entry if it doesn't exist
				if (!dateCounts[date]) {
					dateCounts[date] = { created: 0, completed: 0 };
				}

				// Increment the created count for the date
				dateCounts[date].created += 1;

				// If the todo is completed, increment the completed count
				if (todo.completedAt) {
					dateCounts[date].completed += 1;
				}
			});

			// Convert the dateCounts object into an array of objects for the chart
			const formattedData = Object.keys(dateCounts).map((date) => ({
				date: dayjs(date).format('MMMM DD'),
				created: dateCounts[date].created,
				completed: dateCounts[date].completed,
			}));

			console.log('Formatted Chart Data:', formattedData);
			return formattedData;
		}

		return []; // Return an empty array if there are no todos
	}, [todos]);

	return (
		<Card className="flex flex-grow flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Bar Chart - Multiple</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="overflow-hidden flex flex-grow">
				<ChartContainer
					config={chartConfig}
					className="flex flex-grow overflow-auto"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar
							dataKey="created"
							fill="var(--color-created)"
							radius={4}
						/>
						<Bar
							dataKey="completed"
							fill="var(--color-completed)"
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default TodoChart;
