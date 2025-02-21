import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { CodeBlock as Wrapper } from 'react-code-block';

const CodeBlock = ({
	code,
	language,
	maxHeight,
	showCopyIcon = false,
}: {
	code: string;
	language: string;
	maxHeight: string;
	showCopyIcon?: boolean;
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1500);
	};
	return (
		<Wrapper
			code={code}
			language={language}
		>
			<div className="relative w-full">
				<ScrollArea className="w-full">
					<div style={{ maxHeight: `${maxHeight}px` }}>
						<Wrapper.Code className="bg-black rounded-md p-2">
							<Wrapper.LineContent>
								<Wrapper.Token />
							</Wrapper.LineContent>
						</Wrapper.Code>

						<ScrollBar orientation="horizontal" />
					</div>
				</ScrollArea>
				<button
					onClick={copyToClipboard}
					className={cn('hidden absolute right-4 top-1', showCopyIcon && 'block')}
				>
					{isCopied ? (
						<CopyCheckIcon
							size={18}
							color="green"
						/>
					) : (
						<CopyIcon size={18} />
					)}
				</button>
			</div>
		</Wrapper>
	);
};

export default CodeBlock;
