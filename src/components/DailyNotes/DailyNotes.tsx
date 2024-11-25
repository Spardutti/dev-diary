import RichEditor from '@/components/RichTextEditor';
import dayjs from 'dayjs';

interface DailyNotesProps {
	date?: string;
}

const DailyNotes = ({ date }: DailyNotesProps) => {
	const selectedDate = dayjs(date || dayjs());
	const day = selectedDate.format('ddd');
	const numericDate = selectedDate.date();
	const monthAndYear = selectedDate.format('MMM YYYY');

	return (
		<div className="flex-grow flex h-full flex-col">
			<header className="flex justify-center py-4">
				<h1 className="text-xl font-semibold">
					Notes Of {day} {numericDate}, {monthAndYear}
				</h1>
			</header>

			<RichEditor />
		</div>
	);
};

export default DailyNotes;
