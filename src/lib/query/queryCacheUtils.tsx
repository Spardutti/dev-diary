import type { IResponse } from '@/lib/axios';
import type { QueryClient, QueryKey } from '@tanstack/react-query';

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

export const updateCacheList = <T,>({
	queryClient,
	item,
	queryKey,
	matchBy,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	item: T;
	matchBy: (a: T, b: T) => boolean;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData) return;

		return {
			...oldData,
			data: oldData.data.map((i) => (matchBy(i, item) ? item : i)),
		};
	});
};

export const removeFromCacheList = <T,>({
	queryClient,
	queryKey,
	matchBy,
	id,
}: {
	queryClient: QueryClient;
	queryKey: QueryKey;
	matchBy: (a: T, b: string) => boolean;
	id: string;
}) => {
	queryClient.setQueryData<IResponse<T[]>>(queryKey, (oldData) => {
		if (!oldData) return;

		const newList = oldData.data.filter((i) => !matchBy(i, id));

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
