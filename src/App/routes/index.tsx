// src/app/routes.ts
import Dashboard from '@/app/pages/Dashboard';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';

export const paths = {
	dashboard: '/dashboard',
	test: '/test',
};

export const routeDefinitions = [
	{
		path: paths.dashboard,
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
	{
		path: paths.test,
		element: <p>Test Page</p>,
	},
];
