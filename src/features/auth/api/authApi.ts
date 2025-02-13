import type { ILoginPayload, ISignupPayload, IUser } from '@/features/auth/types/IUser';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const login = ({ data }: { data: ILoginPayload }) =>
	axiosHelper<IResponse<{ token: string; user: IUser }>>({ method: 'post', url: '/user/login', data });

export const signup = (data: ISignupPayload) =>
	axiosHelper<IResponse<IUser>>({ method: 'post', url: '/user/create', data });

export const me = () => axiosHelper<IResponse<IUser>>({ method: 'get', url: '/user/me' });
