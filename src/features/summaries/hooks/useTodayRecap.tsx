import { useCreateSummary, useGetTodaySummaryExists } from '@/features/summaries/api/summaryQueries';
import { useNavigate, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';

export const useDailyRecap = () => {
	const { mutateAsync, isPending } = useCreateSummary();
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/dashboard' });

	const { data } = useGetTodaySummaryExists(projectId);
	const navigate = useNavigate();

	const createDailyRecap = async () => {
		const response = await mutateAsync({
			date: dayjs().toString(),
			projectId,
		});

		navigate({ to: '/projects/$projectId/summaries/$summaryId', params: { projectId, summaryId: response.data.id } });
	};

	return { createDailyRecap, isLoading: isPending, exists: data };
};
