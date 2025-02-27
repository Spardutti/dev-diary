import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';

interface DateSelectorProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
	return (
		<div className="flex items-center space-x-2 mb-6">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-[240px] justify-start text-left font-normal bg-black border-gray-700 text-gray-300',
							!date && 'text-gray-500',
						)}
					>
						<div className="flex gap-2 items-center">
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? dayjs(date).format('YYYY - MM - DD') : 'Select a date'}
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(e) => {
							setDate(e);
						}}
						initialFocus
						className="bg-gray-900 text-white"
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateSelector;
