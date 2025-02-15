import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { IUser } from '@/features/auth/types/IUser';

interface IAuth {
	profile: IUser | undefined;
	setProfile: (profile: IUser) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<IUser | undefined>(undefined);

	const value = useMemo(
		() => ({
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
