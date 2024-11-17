import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/app/routes';
import Layout from '@/components/Layout';
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const theme = createTheme({});

const Providers = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
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
			</MantineProvider>
		</QueryClientProvider>
	);
};

export default Providers;
