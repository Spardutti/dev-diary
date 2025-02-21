import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-neutral-400 dark:bg-neutral-50/10', className)}
			{...props}
		/>
	);
};

export { Skeleton };
