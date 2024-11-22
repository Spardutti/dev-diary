import { createFileRoute, redirect } from '@tanstack/react-router';
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

export const Route = createFileRoute('/dashboard')({
	beforeLoad: () => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			throw redirect({
				to: '/',
			});
		}
	},
	loader: async ({ context }) => {
		const { queryClient } = context;
		await queryClient.ensureQueryData({
			queryKey: ['profile'],
		});
	},
	component: Dashboard,
});
