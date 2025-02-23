import type { AuthContext } from '@/context/useAuth';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
	authentication: AuthContext;
	queryClient: QueryClient;
	routeTitle: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			{import.meta.env.VITE_API_NODE_ENV === 'develop' && <TanStackRouterDevtools />}
		</>
	),
});
