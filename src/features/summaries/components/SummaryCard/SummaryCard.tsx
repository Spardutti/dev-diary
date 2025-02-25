import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ISummary } from '@/features/summaries/types/ISummary';
import { parseHtmlToText } from '@/utils/parseHtmlToText';
import { Link, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Circle, CircleCheck } from 'lucide-react';

interface SummaryCardProps {
	summary: ISummary;
}

const SummaryCard = ({ summary }: SummaryCardProps) => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/summaries/' });
	return (
		<Link
			to="/projects/$projectId/summaries/$summaryId"
			params={{ summaryId: summary.id, projectId }}
		>
			<Card className="w-60">
				<CardHeader>
					<CardTitle className="font-bold text-lg text-text">{dayjs(summary.createdAt).format('dddd DD')}</CardTitle>
					<CardDescription>{dayjs(summary.createdAt).format('MMMM, YYYY')}</CardDescription>
				</CardHeader>

				<CardContent className="h-32">
					<div className="flex flex-col gap-2">
						<p className="line-clamp-2 h-12"> {parseHtmlToText(summary.noteContent)}</p>

						<div className="flex flex-col gap-2">
							<div className="flex gap-2 items-center">
								<CircleCheck
									color="green"
									size={18}
								/>
								{summary.completedTodos.length} Completed
							</div>
							<div className="flex gap-2 items-center">
								<Circle
									className="text-red-400"
									size={18}
								/>
								<p>{summary.createdTodos.length} Pending</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default SummaryCard;
