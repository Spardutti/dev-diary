import { createLazyFileRoute } from '@tanstack/react-router';
import DailyNotes from '@/components/DailyNotes';
import Todos from '@/components/Todos';

const Dashboard = () => {
	return (
		<div className="flex flex-grow">
			<DailyNotes />

			<Todos />
		</div>
	);
};

export const Route = createLazyFileRoute('/dashboard')({
	component: Dashboard,
});
