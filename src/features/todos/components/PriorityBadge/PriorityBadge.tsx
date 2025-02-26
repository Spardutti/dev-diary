import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PriorityBadge = ({ priority, setPriority }: { priority: number; setPriority: (v: number) => void }) => {
	const config = {
		0: 'default',
		1: 'low',
		2: 'mid',
		3: 'high',
	};

	const colors: Record<number, string> = {
		0: 'bg-background',
		1: 'bg-priority-low',
		2: 'bg-priority-mid',
		3: 'bg-priority-high',
	};

	return Object.entries(config).map(([key, value]) => (
		<Badge
			onClick={() => setPriority(Number(key))}
			key={key}
			className={cn('cursor-pointer', colors[Number(key)], Number(key) === priority && 'ring-primary ring-2')}
		>
			{value}
		</Badge>
	));
};

export default PriorityBadge;
