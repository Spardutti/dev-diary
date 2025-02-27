import DateSelector from '@/components/Common/DateSelector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { todosTableFilterQuery } from '@/routes/_authenticated/projects/$projectId/todos';
import { useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CalendarIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TodosTableFiltersProps {
	setFilters: (filters: string) => void;
}

const TodosTableFilters = ({ setFilters }: TodosTableFiltersProps) => {
	const [date, setDate] = useState<Date | undefined>();
	const [title, setTitle] = useState<string>('');
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/todos/' });

	const debouncedTitle = useDebounce(title, 1000);

	useEffect(() => {
		const filters: string[] = [];

		if (title) {
			filters.push(`title=${encodeURIComponent(title)}`);
		}
		if (date) {
			filters.push(`completedAt=${dayjs(date).toISOString()}`);
		}

		const queryString = filters.length > 0 ? filters.join('&') : '';

		setFilters(todosTableFilterQuery(projectId, queryString));
	}, [debouncedTitle, date]);

	return (
		<div className=" rounded-lg shadow p-4 mb-6">
			<h2 className="text-sm font-medium mb-3 text-text">Filters</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label
						htmlFor="title-search"
						className="text-sm  font-medium flex items-center gap-1"
					>
						<Search className="h-4 w-4" />
						Search by title
					</label>
					<div>
						<Input
							id="title-search"
							placeholder="Filter todos..."
							onChange={(event) => setTitle(event.target.value)}
							className="max-w-sm"
							value={title ?? ''}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium flex items-center gap-1">
						<CalendarIcon className="h-4 w-4" />
						Filter by completion date
					</label>
					<DateSelector
						date={date}
						setDate={setDate}
					/>
				</div>
			</div>

			{(date || title) && (
				<div className="flex items-center gap-2 mt-4">
					<span className="text-sm text-gray-500">Active filters:</span>
					{date && (
						<Badge
							variant="secondary"
							className="flex items-center gap-1"
						>
							Date: {dayjs(date).format('YYYY-MM-DD')}
							<Button
								variant="ghost"
								size="sm"
								className="h-4 w-4 p-0 ml-1"
								onClick={() => setDate(undefined)}
							>
								×
							</Button>
						</Badge>
					)}
					{title && (
						<Badge
							variant="secondary"
							className="flex items-center gap-1"
						>
							Title: {title}
							<Button
								variant="ghost"
								size="sm"
								className="h-4 w-4 p-0 ml-1"
								onClick={() => setTitle('')}
							>
								×
							</Button>
						</Badge>
					)}
					<Button
						variant="ghost"
						size="sm"
						className="text-xs"
						onClick={() => {
							setDate(undefined);
							setTitle('');
						}}
					>
						Clear all
					</Button>
				</div>
			)}
		</div>
	);
};

export default TodosTableFilters;
