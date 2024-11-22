import { paths } from '@/app/routes';
import { useAuth } from '@/context/useAuth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, isLoading, logout } = useAuth();

	if (isLoading) {
		return (
			<div className="absolute inset-0 flex justify-center items-center z-50 bg-black/70">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	if (!isAuthenticated) {
		logout();
		return (
			<Navigate
				to={paths.home}
				replace
			/>
		);
	}

	return children;
};

export default ProtectedRoute;
