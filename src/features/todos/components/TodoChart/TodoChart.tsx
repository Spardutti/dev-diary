import type { ChartConfig } from '@/components/ui/chart';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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

interface TodoChartProps {
	chartData: {
		date: string;
		created: number;
		completed: number;
	}[];
}

const TodoChart = ({ chartData }: TodoChartProps) => {
	return (
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
					type="monotone"
					fill="url(#fillCreated)"
					stroke="var(--color-created)"
				/>
				<Area
					dataKey="completed"
					type="monotone"
					fill="url(#fillCompleted)"
					stroke="var(--color-completed)"
				/>
				<ChartLegend content={<ChartLegendContent />} />
			</AreaChart>
		</ChartContainer>
	);
};

export default TodoChart;
