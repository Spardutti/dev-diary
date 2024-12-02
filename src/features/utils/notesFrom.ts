import dayjs from 'dayjs';

export const notesFrom = (date: string | undefined) => {
	const selectedDate = dayjs(date || dayjs());
	const day = selectedDate.format('ddd');
	const numericDate = selectedDate.date();
	const monthAndYear = selectedDate.format('MMM YYYY');

	return `Notes Of ${day} ${numericDate}, ${monthAndYear}`;
};
