import { AuthProvider, useAuth } from '@/context/useAuth';
import { routeTree } from '@/routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
	},
});

export const router = createRouter({ routeTree, context: { authentication: undefined!, queryClient: queryClient } });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const App = () => {
	const auth = useAuth();
	return (
		<RouterProvider
			context={{ authentication: auth }}
			router={router}
		/>
	);
};

const Provider = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default Provider;
