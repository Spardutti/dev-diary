import type { IPaginatedResponse } from '@/lib/axios';
import type { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query';

interface Base<Item> {
	queryKey: QueryKey;
	queryClient: ReturnType<typeof useQueryClient>;
	matchBy: ((item: Item) => boolean) | null;
}

interface NewItem<NewItem, Item> extends Base<Item> {
	newItem: NewItem;
}

export const prependItemToPaginatedList = <Item,>({ queryKey, queryClient, newItem }: NewItem<Item, Item>) => {
	return queryClient.setQueryData<InfiniteData<IPaginatedResponse<Item>>>(queryKey, (oldData) => {
		if (oldData?.pages[0]?.results) {
			return {
				...oldData,
				pages: [
					{
						...oldData.pages[0],
						results: [newItem, ...oldData.pages[0].results],
					},
					...oldData.pages.slice(1), // Keep the rest of the pages unchanged
				],
			};
		}
	});
};

export const editItemInPaginatedList = <Item, INewItem>({
	queryKey,
	queryClient,
	newItem,
	matchBy,
}: NewItem<INewItem, Item>) => {
	return queryClient.setQueryData<InfiniteData<IPaginatedResponse<Item>>>(queryKey, (oldData) => {
		if (oldData?.pages[0]?.results) {
			return {
				...oldData,
				pages: [
					{
						...oldData.pages[0],
						results: oldData.pages[0].results.map((item) => {
							if (matchBy && matchBy(item)) {
								return { ...item, ...newItem };
							}

							return item;
						}),
					},
					...oldData.pages.slice(1), // Keep the rest of the pages unchanged
				],
			};
		}
	});
};

export const removeItemFromPaginatedList = <Item,>({ queryKey, queryClient, matchBy }: Base<Item>) => {
	return queryClient.setQueryData<InfiniteData<IPaginatedResponse<Item>>>(queryKey, (oldData) => {
		if (oldData?.pages[0]?.results) {
			return {
				...oldData,
				pages: [
					{
						...oldData.pages[0],
						results: oldData.pages[0].results.filter((item) => !matchBy!(item)),
					},
					...oldData.pages.slice(1), // Keep the rest of the pages unchanged
				],
			};
		}
	});
};
