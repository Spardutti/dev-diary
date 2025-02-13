import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setDefaultHeaders, type IResponse } from '@/lib/axios';
import type { ILoginPayload, ISignupPayload, IUser } from '@/features/auth/types/IUser';
import { useNavigate } from '@tanstack/react-router';
import { login, me, signup } from '@/features/auth/api/authApi';

export const authQueryKeys = {
	all: ['profile'] as const,
	detail: (id: string) => [...authQueryKeys.all, id] as const,
};

export const useGuestLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () => axiosHelper<IResponse<{ user: IUser; token: string }>>({ method: 'post', url: '/guests/' }),
		onSuccess: async (response) => {
			const token = response.data.token;

			localStorage.setItem('authToken', token);
			setDefaultHeaders(token);

			try {
				const lastProjectId = response?.data?.user?.lastVisitedProjectId;
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
		mutationFn: (data: ILoginPayload) => login({ data }),
		onSuccess: async (response) => {
			const token = response.data.token;

			localStorage.setItem('authToken', token);
			setDefaultHeaders(token);

			queryClient.setQueryData(authQueryKeys.all, response.data.user);

			navigate({
				to: `/projects/$projectId/dashboard`,
				params: { projectId: response.data.user.lastVisitedProjectId },
			});
		},
	});
};

export const useSignUp = () =>
	useMutation({
		mutationFn: (data: ISignupPayload) => signup(data),
	});

export const useGetProfile = (token: string | null) =>
	useQuery({
		queryKey: authQueryKeys.all,
		queryFn: me,
		enabled: !!token,
	});
