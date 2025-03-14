import TodoChart from '@/features/todos/components/TodoChart';
import React from 'react';

interface TodoStatsProps {}

const TodoStats: React.FC<TodoStatsProps> = () => {
	return (
		<div>
			<TodoChart />
		</div>
	);
};

export default TodoStats;
