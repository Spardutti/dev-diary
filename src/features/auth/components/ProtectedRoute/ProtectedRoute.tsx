import { useAuth } from '@/context/useAuth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return children;
};

export default ProtectedRoute;
