import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/features/snippets/components/CodeBlock/CodeBlock';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { Link, useParams } from '@tanstack/react-router';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

interface SnippetCardProps {
	snippet: ISnippet;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/snippets/' });

	const copyCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		window.navigator.clipboard.writeText(snippet.code);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<Link
			to="/projects/$projectId/snippets/$snippetId"
			params={{ snippetId: snippet.id, projectId }}
		>
			<Card className="overflow-hidden w-[260px]">
				<CardHeader className="h-[68px]">
					<div className="flex gap-1 justify-between">
						<CardTitle className="line-clamp-1">{snippet.title}</CardTitle>
						<button
							className="flex-shrink-0"
							onClick={(e) => copyCode(e)}
						>
							{isCopied ? (
								<CopyCheckIcon
									color="green"
									size={18}
								/>
							) : (
								<CopyIcon size={18} />
							)}
						</button>
					</div>
					<Badge
						variant="secondary"
						className="w-fit"
					>
						{snippet.language}
					</Badge>
				</CardHeader>
				<CardContent className="p-2 h-[168px]">
					<div className="overflow-hidden">
						<CodeBlock
							maxHeight="150"
							code={snippet.code}
							language={snippet.language}
						/>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default SnippetCard;
