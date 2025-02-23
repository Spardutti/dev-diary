import { AuthProvider, useAuth } from '@/context/useAuth';
import { routeTree } from '@/routeTree.gen';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { toast, ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
	},
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(error.message);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			toast.error(error.message);
		},
	}),
});

export const router = createRouter({
	routeTree,
	context: { authentication: undefined!, queryClient: queryClient, routeTitle: '' },
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const App = () => {
	const auth = useAuth();
	return (
		<div>
			<RouterProvider
				context={{ authentication: auth }}
				router={router}
			/>
			<ToastContainer position="top-center" />
		</div>
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
