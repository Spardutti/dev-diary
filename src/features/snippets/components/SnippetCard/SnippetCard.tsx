import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { CodeBlock } from 'react-code-block';

export const CodeBlockDemo = ({ code }: { code: string }) => {
	return (
		<CodeBlock
			code={code}
			language="js"
		>
			<CodeBlock.Code className="bg-black overflow-hidden">
				<CodeBlock.LineContent>
					<CodeBlock.Token />
				</CodeBlock.LineContent>
			</CodeBlock.Code>
		</CodeBlock>
	);
};

interface SnippetCardProps {
	snippet: ISnippet;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => {
	return (
		<Card className="size-[256px] overflow-hidden">
			<CardHeader>
				<CardTitle>{snippet.title}</CardTitle>
			</CardHeader>
			<CardContent className="overflow-hidden">
				<CodeBlockDemo code={snippet.code} />
			</CardContent>
		</Card>
	);
};

export default SnippetCard;
