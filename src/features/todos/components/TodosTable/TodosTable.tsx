import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import type { MutableRefObject } from 'react';

interface TodosTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

const TodosTable = <TData, TValue>({
	columns,
	data,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
}: TodosTableProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const { observerRef } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								style={{ width: header.getSize() }}
							>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.length > 0 ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									style={{ width: cell.column.getSize() }}
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center"
						>
							No results.
						</TableCell>
					</TableRow>
				)}
				{isFetchingNextPage && (
					<TableRow className="flex gap-2 flex-col mt-2">
						{Array.from({ length: 4 }).map((_, index) => (
							<TableCell key={index}>
								<Skeleton className="h-14" />
							</TableCell>
						))}
					</TableRow>
				)}
			</TableBody>
			<TableFooter ref={observerRef as MutableRefObject<HTMLTableSectionElement | null>} />
		</Table>
	);
};

export default TodosTable;
