import { createFileRoute, redirect } from '@tanstack/react-router';
import Layout from '@/components/Layout';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: () => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			throw redirect({
				to: '/',
			});
		}
	},
	onEnter: () => {
		throw redirect({
			to: '/',
		});
	},
	loader: async ({ context }) => {
		const { queryClient } = context;
		await queryClient.ensureQueryData({
			queryKey: ['profile'],
		});
	},
	component: Layout,
});
