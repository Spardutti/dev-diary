import type { IPaginatedResponse } from '@/lib/axios';
import type { InfiniteData } from '@tanstack/react-query';

export const formatPaginationList = <T,>(list: InfiniteData<IPaginatedResponse<T>>) => {
	// flat the pages array
	return list.pages.flatMap((page) => page.results);
};
