import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setDefaultHeaders, type IResponse } from '@/lib/axios';
import type { IToken, IUser } from '@/features/auth/types/IUser';
import { useNavigate } from '@tanstack/react-router';

export const useGuestLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () => axiosHelper<IResponse<{ user: IUser; token: IToken }>>({ method: 'post', url: '/guests/' }),
		onSuccess: async (response) => {
			const token = response.data.token.access;

			localStorage.setItem('authToken', token);
			setDefaultHeaders(token);

			try {
				const lastProjectId = response?.data?.user?.lastProject;
				if (lastProjectId) {
					navigate({ to: `/projects/$projectId/dashboard`, params: { projectId: lastProjectId } });
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		},
	});
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			axiosHelper<IToken>({ method: 'post', url: '/token/', data }),
		onSuccess: async (response) => {
			const token = response.access;

			localStorage.setItem('authToken', token);
			setDefaultHeaders(token);

			try {
				const profile = await queryClient.fetchQuery<IResponse<IUser>>({
					queryKey: ['profile'],
					queryFn: () => axiosHelper<IResponse<IUser>>({ method: 'get', url: '/users/' }),
				});

				const lastProjectId = profile?.data?.lastProject;
				if (lastProjectId) {
					navigate({ to: `/projects/$projectId/dashboard`, params: { projectId: lastProjectId } });
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		},
	});
};

export const useSignUp = () =>
	useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			axiosHelper<IResponse<IToken>>({ method: 'post', url: '/users/', data }),
	});

export const useGetProfile = (token: string | null) =>
	useQuery({
		queryKey: ['profile'],
		queryFn: () => axiosHelper<IResponse<IUser>>({ method: 'get', url: '/users/' }),
		enabled: !!token,
	});
