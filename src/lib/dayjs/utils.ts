import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Returns date in YYYY-MM-DD format (e.g., "2025-02-20")
 */
export const formatDate = (date: string | Date) => {
	return dayjs(date).format('YYYY-MM-DD');
};

/**
 * Returns date and time in YYYY-MM-DD HH:mm:ss format (e.g., "2025-02-20 14:30:45")
 */
export const formatDateTime = (date: string | Date) => {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Returns only the time in HH:mm:ss format (e.g., "14:30:45")
 */
export const formatTime = (date: string | Date) => {
	return dayjs(date).format('HH:mm:ss');
};

/**
 * Returns a relative time from now (e.g., "2 hours ago", "in 5 minutes")
 */
export const timeFromNow = (date: string | Date) => {
	return dayjs(date).fromNow();
};
