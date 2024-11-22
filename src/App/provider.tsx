import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { paths, routeDefinitions } from '@/app/routes';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/useAuth';
import Home from '@/app/pages/Home';

const Providers = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route
							element={<Home />}
							path={paths.home}
						/>

						<Route element={<Layout />}>
							{routeDefinitions.map(({ path, element }) => (
								<Route
									key={path}
									path={path}
									element={element}
								/>
							))}
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default Providers;
