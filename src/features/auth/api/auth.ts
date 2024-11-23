import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IResponse } from '@/lib/axios';
import type { IToken, IUser } from '@/features/auth/types/IUser';

export const useGuestLogin = () =>
	useMutation({
		mutationFn: () => axiosHelper<IResponse<{ user: IUser; token: IToken }>>({ method: 'post', url: '/guests/' }),
	});

export const useLogin = () =>
	useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			axiosHelper<IToken>({ method: 'post', url: '/token/', data }),
	});

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
