import { useGetProfile } from '@/features/auth/api/auth';
import { useLogin, useGuestLogin } from '@/features/auth/api/auth';
import { setDefaultHeaders } from '@/lib/axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { paths } from '@/app/routes';
import type { IUser } from '@/features/auth/types/IUser';

interface IAuth {
	login: (data: { email: string; password: string }) => Promise<void>;
	guestLogin: () => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	profile: IUser | undefined;
	isLoading: boolean;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => {
		const storedToken = localStorage.getItem('authToken');
		if (storedToken) {
			setDefaultHeaders(storedToken);
		}
		return storedToken;
	});

	const navigate = useNavigate();

	const { data: profile, isLoading: profileLoading, isError } = useGetProfile(token);
	const { mutateAsync: loginMutation } = useLogin();
	const { mutateAsync: guestLoginMutation } = useGuestLogin();

	useEffect(() => {
		if (token) {
			setDefaultHeaders(token);
		} else {
			setDefaultHeaders(null);
		}
	}, [token]);

	const login = async (data: { email: string; password: string }) => {
		try {
			const response = await loginMutation(data);
			const userToken = response.data.access;

			setToken(userToken);
			setDefaultHeaders(userToken);

			localStorage.setItem('authToken', userToken);
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		}
	};

	const guestLogin = async () => {
		try {
			const response = await guestLoginMutation();
			const userToken = response.data.token.access;

			setToken(userToken);
			localStorage.setItem('authToken', userToken);
			setDefaultHeaders(userToken);

			navigate(paths.dashboard);
		} catch (error) {
			console.error('Guest login failed:', error);
			throw error;
		}
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('authToken');
		navigate(paths.home);
	};

	const isAuthenticated = !!token && !!profile?.data;

	const isLoading = profileLoading || (token !== null && isError);

	const value = useMemo(
		() => ({
			isAuthenticated,
			login,
			guestLogin,
			logout,
			profile: profile?.data,
			isLoading,
		}),
		[token, profile, isLoading, isAuthenticated],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
