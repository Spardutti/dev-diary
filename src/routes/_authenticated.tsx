import { createFileRoute, redirect } from '@tanstack/react-router';
import Layout from '@/components/Layout';
import { setDefaultHeaders } from '@/lib/axios';
import { router } from '@/App';
import { authQueryKeys } from '@/features/auth/api/authQueries';
import { me } from '@/features/auth/api/authApi';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: () => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			throw redirect({
				to: '/',
			});
		}

		setDefaultHeaders(token);
	},
	loader: async ({ context }) => {
		const { queryClient, authentication } = context;
		try {
			const r = await queryClient.ensureQueryData({
				queryKey: authQueryKeys.all,
				queryFn: me,
			});

			authentication.setProfile(r.data);
			return { profile: r.data };
		} catch (error) {
			router.navigate({ to: '/' });
			localStorage.removeItem('authToken');
			return error;
		}
	},
	component: Layout,
});
