import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUpsertSummary, useGetTodaySummaryExists } from '@/features/summaries/api/summaryQueries';
import { useNavigate, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const DailyRecap = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/dashboard' });
	const { mutateAsync: upsertSummary, isPending: isCreatingSummary } = useUpsertSummary();

	const { data: exists } = useGetTodaySummaryExists(projectId);
	const navigate = useNavigate();

	const createDailyRecap = async () => {
		const response = await upsertSummary({
			date: dayjs().toString(),
			projectId,
		});
		if ('message' in response) {
			toast.info(response.message);
		} else {
			navigate({ to: '/projects/$projectId/summaries/$summaryId', params: { projectId, summaryId: response.data.id } });
		}
	};

	return (
		<div className="flex justify-end">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							isLoading={isCreatingSummary}
							disabled={isCreatingSummary}
							onClick={createDailyRecap}
						>
							{exists ? (
								<div className="flex flex-shrink-0 gap-2 items-center">
									<CheckCircle />
									Daily Recap Done
								</div>
							) : (
								'Daily Recap'
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{exists
							? "Update today's daily recap with the latest completed and created tasks."
							: 'Create a daily recap summarizing all completed and created tasks for today'}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default DailyRecap;
