import * as React from 'react';

import { cn } from '@/lib/utils';
import { useAutosize } from '@/features/notes/hooks/useAutoSize';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
	({ className, onChange, ...props }, ref) => {
		const [textareaRef, adjustHeight] = useAutosize();

		React.useImperativeHandle(ref, () => textareaRef as unknown as HTMLTextAreaElement);

		const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange!(event);
			adjustHeight();
		};
		return (
			<textarea
				className={cn(
					'flex min-h-[80px] w-full max-h-[300px] overflow-x-auto rounded-md outline-none border-background-alt focus-within:bg-background-alt bg-transparent px-3 py-2 text-base resize-none focus-visible:outline-none focus-visible:ring-neutral-950 placeholder:text-neutral-500   focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
					className,
				)}
				onChange={handleChange}
				ref={textareaRef}
				{...props}
			/>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
