import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
