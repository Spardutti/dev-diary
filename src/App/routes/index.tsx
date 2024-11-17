// src/app/routes.ts
import Dashboard from '@/app/pages/Dashboard';

export const routes = [
	{
		path: '/', // Child route for Dashboard
		element: <Dashboard />, // Dashboard rendered inside <Outlet />
	},
	{
		path: '/test', // Another child route
		element: <p>Test Page</p>, // Rendered inside <Outlet />
	},
];
