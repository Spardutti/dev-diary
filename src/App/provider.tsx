import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/app/routes';
import Layout from '@/components/Layout';

const Providers = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						{routes.map(({ path, element }) => (
							<Route
								key={path}
								path={path}
								element={element}
							/>
						))}
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default Providers;
