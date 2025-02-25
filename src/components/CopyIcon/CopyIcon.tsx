import { parseHtmlToText } from '@/utils/parseHtmlToText';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useState } from 'react';

interface CopyToClipboardProps {
	value: string;
	size: number;
}

const CopyToClipboard = ({ value, size }: CopyToClipboardProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const formattedText = parseHtmlToText(value);

	const onClick = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		navigator.clipboard.writeText(formattedText);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return isCopied ? (
		<CopyCheckIcon
			color="green"
			size={size}
		/>
	) : (
		<CopyIcon
			className="hover:text-primary transition-all cursor-pointer"
			onClick={(e) => onClick(e)}
			size={size}
		/>
	);
};

export default CopyToClipboard;
