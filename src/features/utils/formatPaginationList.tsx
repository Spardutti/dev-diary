import type { IPaginatedResponse } from '@/lib/axios';
import type { InfiniteData } from '@tanstack/react-query';

export const flattenInfiniteQueryData = <T,>(data: InfiniteData<IPaginatedResponse<T[]>, unknown> | undefined): T[] => {
	if (!data) return [];

	// Flatten all pages into a single array of items
	return data.pages.flatMap((page) => page.data);
};
