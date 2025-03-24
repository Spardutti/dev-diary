import type { IPaginatedResponse, IResponse } from '@/lib/axios';
import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query';

const dynamicSort = <T,>(fields: string[]) => {
	return (a: T, b: T) => {
		for (const field of fields) {
			const key = field as keyof T; // Type-safe key access
			if (a[key] > b[key]) return -1;
			if (a[key] < b[key]) return 1;
		}
		return 0;
	};
};

export const sortedInsertToCache = <T extends { id: string }>({
	queryClient,
	newItem,
	queryKey,
	sortBy,
}: {
	queryClient: QueryClient;
	newItem: T;
	queryKey: QueryKey;
	sortBy: string; // Example: "status,createdAt,priority"
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		const exist = oldData.data.find((i) => i.id === newItem.id);
		if (exist) return oldData;

		const updatedData = [...oldData.data, newItem];
		const sortFields = sortBy.split(',').map((field) => field.trim());

		updatedData.sort(dynamicSort<T>(sortFields));

		return {
			...oldData,
			data: updatedData,
		};
	});
};

export const updateAndSortCacheListItem = <T,>({
	queryClient,
	item,
	queryKey,
	matchBy,
	sortBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	item: T;
	matchBy: (existingItem: T) => boolean;
	sortBy: string; // Example: "status,createdAt,priority"
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		const updatedData = oldData.data.map((i) => (matchBy(i) ? item : i));

		const sortFields = sortBy.split(',').map((field) => field.trim());
		updatedData.sort(dynamicSort<T>(sortFields));

		return {
			...oldData,
			data: updatedData,
		};
	});
};

export const prependToCache = <T,>({
	queryClient,
	newItem,
	queryKey,
}: {
	queryKey: QueryKey;
	queryClient: QueryClient;
	newItem: T;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		return {
			...oldData,
			data: [newItem, ...oldData.data],
		};
	});
};

export const appendToCache = <T,>({
	queryClient,
	newItem,
	queryKey,
}: {
	queryKey: QueryKey;
	queryClient: QueryClient;
	newItem: T;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		return {
			...oldData,
			data: [...oldData.data, newItem],
		};
	});
};

export const updateCacheListItem = <T,>({
	queryClient,
	item,
	queryKey,
	matchBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	item: T;
	matchBy: (item: T) => boolean;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		return {
			...oldData,
			data: oldData.data.map((i) => (matchBy(i) ? item : i)),
		};
	});
};

export const removeFromCacheList = <T,>({
	queryClient,
	queryKey,
	matchBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	matchBy: (item: T) => boolean;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		const newList = oldData.data.filter((i) => !matchBy(i));

		return {
			...oldData,
			data: [...newList],
		};
	});
};

export const updateCacheItemDetail = <T,>({
	queryClient,
	queryKey,
	item,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	item: T;
}) => {
	queryClient.setQueryData<IResponse<T>>(queryKey, (oldData) => {
		if (!oldData?.data) return;

		return {
			...oldData,
			data: item,
		};
	});
};

export const sortedInsertToPaginatedCache = <T extends { id: string }>({
	queryClient,
	newItem,
	queryKey,
	sortBy,
}: {
	queryClient: QueryClient;
	newItem: T;
	queryKey: QueryKey;
	sortBy: string;
}) => {
	queryClient.setQueryData<InfiniteData<IPaginatedResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData?.pages || oldData.pages.length === 0) {
			return oldData;
		}

		const allItems: T[] = oldData.pages.flatMap((page) => page.data);

		const itemExists = allItems.some((item) => item.id === newItem.id);
		if (itemExists) {
			return oldData;
		}

		const updatedItems = [...allItems, newItem];

		const sortFields = sortBy.split(',').map((field) => field.trim());
		updatedItems.sort(dynamicSort<T>(sortFields));

		return {
			...oldData,
			pages: oldData.pages.map((page, index) => ({
				...page,
				data: index === 0 ? updatedItems : page.data, // Only update the first page
			})),
		};
	});
};

export const removeFromPaginatedCache = <T,>({
	queryClient,
	queryKey,
	matchBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	matchBy: (item: T) => boolean;
}) => {
	queryClient.setQueryData<InfiniteData<IPaginatedResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData?.pages || oldData.pages.length === 0) {
			return oldData;
		}

		const updatedPages = oldData.pages.map((page) => ({
			...page,
			data: page.data.filter((item) => !matchBy(item)),
		}));

		return {
			...oldData,
			pages: updatedPages,
		};
	});
};

export const updateAndSortPaginatedCacheItem = <T,>({
	queryClient,
	queryKey,
	item,
	matchBy,
	sortBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	item: T;
	matchBy: (item: T) => boolean;
	sortBy: string;
}) => {
	queryClient.setQueryData<InfiniteData<IPaginatedResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData?.pages || oldData.pages.length === 0) {
			return oldData;
		}

		const allItems: T[] = oldData.pages.flatMap((page) => page.data);

		const updatedItems = allItems.map((i) => (matchBy(i) ? item : i));

		const sortFields = sortBy.split(',').map((field) => field.trim());
		updatedItems.sort(dynamicSort<T>(sortFields));

		let startIndex = 0;
		const updatedPages = oldData.pages.map((page) => {
			const pageSize = page.data.length;
			const newPageData = updatedItems.slice(startIndex, startIndex + pageSize);
			startIndex += pageSize;
			return { ...page, data: newPageData };
		});

		return {
			...oldData,
			pages: updatedPages,
		};
	});
};
