import { createFileRoute, redirect } from '@tanstack/react-router';
import Layout from '@/components/Layout';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { setDefaultHeaders, type IResponse } from '@/lib/axios';
import type { IUser } from '@/features/auth/types/IUser';
import { router } from '@/App';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: () => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			throw redirect({
				to: '/',
			});
		}
	},
	loader: async ({ context }) => {
		const { queryClient, authentication } = context;
		const token = localStorage.getItem('authToken');
		setDefaultHeaders(token);
		try {
			const r = await queryClient.ensureQueryData({
				queryKey: ['profile'],
				queryFn: () => axiosHelper<IResponse<IUser>>({ method: 'get', url: '/users/' }),
			});

			authentication.setProfile(r.data);
		} catch (error) {
			router.navigate({ to: '/' });
			localStorage.removeItem('authToken');
			return error;
		}
	},
	component: Layout,
});
