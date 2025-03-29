import { useGetTodos } from '@/features/todos/api/todosQueries';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const today = dayjs();
const sixMonthAgo = today.subtract(6, 'month');

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	completed: {
		label: 'completed',
		color: 'rgb(var(--todo-completed-chart))',
	},
	created: {
		label: 'Created',
		color: 'hsl(var(--todo-incomplete-chart))',
	},
} satisfies ChartConfig;

const TodoChart = () => {
	const [timeRange, setTimeRange] = useState('90');

	const { data: todos } = useGetTodos(
		`from=${today.subtract(Number(timeRange), 'day').toISOString()}&to=${today.toISOString()}&limit=200`,
	);

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
				date: dayjs(date).format('YYYY-MM-DD'),
				created: dateCounts[date].created,
				completed: dateCounts[date].completed,
			}));

			console.log('Formatted Chart Data:', formattedData);
			return formattedData.sort((a, b) => a.date.localeCompare(b.date));
		}

		return []; // Return an empty array if there are no todos
	}, [todos]);

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date('2024-06-30');
		let daysToSubtract = 90;
		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b border-b-primary py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>Showing total visitors for the last 3 months</CardDescription>
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
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient
								id="fillCompleted"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-completed)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-completed)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillCreated"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-created)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-created)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							className="border-primary"
							vertical={false}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="created"
							type="natural"
							fill="url(#fillCreated)"
							stroke="var(--color-created)"
						/>
						<Area
							dataKey="completed"
							type="natural"
							fill="url(#fillCompleted)"
							stroke="var(--color-completed)"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default TodoChart;

const chartData = [
	{ date: '2024-04-01', completed: 222, created: 150 },
	{ date: '2024-04-02', completed: 97, created: 180 },
	{ date: '2024-04-03', completed: 167, created: 120 },
	{ date: '2024-04-04', completed: 242, created: 260 },
	{ date: '2024-04-05', completed: 373, created: 290 },
	{ date: '2024-04-06', completed: 301, created: 340 },
	{ date: '2024-04-07', completed: 245, created: 180 },
	{ date: '2024-04-08', completed: 409, created: 320 },
	{ date: '2024-04-09', completed: 59, created: 110 },
	{ date: '2024-04-10', completed: 261, created: 190 },
	{ date: '2024-04-11', completed: 327, created: 350 },
	{ date: '2024-04-12', completed: 292, created: 210 },
	{ date: '2024-04-13', completed: 342, created: 380 },
	{ date: '2024-04-14', completed: 137, created: 220 },
	{ date: '2024-04-15', completed: 120, created: 170 },
	{ date: '2024-04-16', completed: 138, created: 190 },
	{ date: '2024-04-17', completed: 446, created: 360 },
	{ date: '2024-04-18', completed: 364, created: 410 },
	{ date: '2024-04-19', completed: 243, created: 180 },
	{ date: '2024-04-20', completed: 89, created: 150 },
	{ date: '2024-04-21', completed: 137, created: 200 },
	{ date: '2024-04-22', completed: 224, created: 170 },
	{ date: '2024-04-23', completed: 138, created: 230 },
	{ date: '2024-04-24', completed: 387, created: 290 },
	{ date: '2024-04-25', completed: 215, created: 250 },
	{ date: '2024-04-26', completed: 75, created: 130 },
	{ date: '2024-04-27', completed: 383, created: 420 },
	{ date: '2024-04-28', completed: 122, created: 180 },
	{ date: '2024-04-29', completed: 315, created: 240 },
	{ date: '2024-04-30', completed: 454, created: 380 },
	{ date: '2024-05-01', completed: 165, created: 220 },
	{ date: '2024-05-02', completed: 293, created: 310 },
	{ date: '2024-05-03', completed: 247, created: 190 },
	{ date: '2024-05-04', completed: 385, created: 420 },
	{ date: '2024-05-05', completed: 481, created: 390 },
	{ date: '2024-05-06', completed: 498, created: 520 },
	{ date: '2024-05-07', completed: 388, created: 300 },
	{ date: '2024-05-08', completed: 149, created: 210 },
	{ date: '2024-05-09', completed: 227, created: 180 },
	{ date: '2024-05-10', completed: 293, created: 330 },
	{ date: '2024-05-11', completed: 335, created: 270 },
	{ date: '2024-05-12', completed: 197, created: 240 },
	{ date: '2024-05-13', completed: 197, created: 160 },
	{ date: '2024-05-14', completed: 448, created: 490 },
	{ date: '2024-05-15', completed: 473, created: 380 },
	{ date: '2024-05-16', completed: 338, created: 400 },
	{ date: '2024-05-17', completed: 499, created: 420 },
	{ date: '2024-05-18', completed: 315, created: 350 },
	{ date: '2024-05-19', completed: 235, created: 180 },
	{ date: '2024-05-20', completed: 177, created: 230 },
	{ date: '2024-05-21', completed: 82, created: 140 },
	{ date: '2024-05-22', completed: 81, created: 120 },
	{ date: '2024-05-23', completed: 252, created: 290 },
	{ date: '2024-05-24', completed: 294, created: 220 },
	{ date: '2024-05-25', completed: 201, created: 250 },
	{ date: '2024-05-26', completed: 213, created: 170 },
	{ date: '2024-05-27', completed: 420, created: 460 },
	{ date: '2024-05-28', completed: 233, created: 190 },
	{ date: '2024-05-29', completed: 78, created: 130 },
	{ date: '2024-05-30', completed: 340, created: 280 },
	{ date: '2024-05-31', completed: 178, created: 230 },
	{ date: '2024-06-01', completed: 178, created: 200 },
	{ date: '2024-06-02', completed: 470, created: 410 },
	{ date: '2024-06-03', completed: 103, created: 160 },
	{ date: '2024-06-04', completed: 439, created: 380 },
	{ date: '2024-06-05', completed: 88, created: 140 },
	{ date: '2024-06-06', completed: 294, created: 250 },
	{ date: '2024-06-07', completed: 323, created: 370 },
	{ date: '2024-06-08', completed: 385, created: 320 },
	{ date: '2024-06-09', completed: 438, created: 480 },
	{ date: '2024-06-10', completed: 155, created: 200 },
	{ date: '2024-06-11', completed: 92, created: 150 },
	{ date: '2024-06-12', completed: 492, created: 420 },
	{ date: '2024-06-13', completed: 81, created: 130 },
	{ date: '2024-06-14', completed: 426, created: 380 },
	{ date: '2024-06-15', completed: 307, created: 350 },
	{ date: '2024-06-16', completed: 371, created: 310 },
	{ date: '2024-06-17', completed: 475, created: 520 },
	{ date: '2024-06-18', completed: 107, created: 170 },
	{ date: '2024-06-19', completed: 341, created: 290 },
	{ date: '2024-06-20', completed: 408, created: 450 },
	{ date: '2024-06-21', completed: 169, created: 210 },
	{ date: '2024-06-22', completed: 317, created: 270 },
	{ date: '2024-06-23', completed: 480, created: 530 },
	{ date: '2024-06-24', completed: 132, created: 180 },
	{ date: '2024-06-25', completed: 141, created: 190 },
	{ date: '2024-06-26', completed: 434, created: 380 },
	{ date: '2024-06-27', completed: 448, created: 490 },
	{ date: '2024-06-28', completed: 149, created: 200 },
	{ date: '2024-06-29', completed: 103, created: 160 },
	{ date: '2024-06-30', completed: 446, created: 400 },
];
