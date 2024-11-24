import { setDefaultHeaders } from '@/lib/axios';
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { IUser } from '@/features/auth/types/IUser';
import { router } from '@/App';
import { useQueryClient } from '@tanstack/react-query';

interface IAuth {
	logout: () => void;
	profile: IUser | undefined;
	setProfile: (profile: IUser) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<IUser | undefined>(undefined);
	const queryClient = useQueryClient();

	const clearToken = () => {
		localStorage.removeItem('authToken');
		setDefaultHeaders(null);
		queryClient.clear();
	};

	const logout = () => {
		clearToken();
		router.navigate({ to: '/' });
	};

	const value = useMemo(
		() => ({
			logout,
			profile,
			setProfile,
		}),
		[profile],
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

export type AuthContext = ReturnType<typeof useAuth>;
