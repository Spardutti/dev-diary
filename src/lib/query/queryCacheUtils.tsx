import type { IResponse } from '@/lib/axios';
import type { QueryClient, QueryKey } from '@tanstack/react-query';

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

export const sortedInsertToCache = <T,>({
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
		if (!oldData) return;

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
		if (!oldData) return;

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
		if (!oldData) return;

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
		if (!oldData) return;

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
		if (!oldData) return;

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
		if (!oldData) return;

		return {
			...oldData,
			data: item,
		};
	});
};
