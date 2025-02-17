import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setDefaultHeaders } from '@/lib/axios';
import type { ILoginPayload, ISignupPayload } from '@/features/auth/types/IUser';
import { useNavigate } from '@tanstack/react-router';
import { guest, login, logout, me, signup } from '@/features/auth/api/authApi';

export const authQueryKeys = {
	all: ['profile'] as const,
	detail: (id: string) => [...authQueryKeys.all, id] as const,
};

export const useGuestLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: guest,
		onSuccess: async (response) => {
			const token = response.data.token;

			localStorage.setItem('authToken', token);
			setDefaultHeaders(token);

			navigate({
				to: `/projects/$projectId/dashboard`,
				params: { projectId: response.data.user.lastVisitedProjectId },
			});
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

			queryClient.setQueryData(authQueryKeys.all, { data: response.data.user });

			navigate({
				to: `/projects/$projectId/dashboard`,
				params: { projectId: response.data.user.lastVisitedProjectId },
			});
		},
	});
};

export const useLogout = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			localStorage.removeItem('authToken');
			setDefaultHeaders(null);
			navigate({ to: '/' });
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
