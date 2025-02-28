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
		0: 'px-2 py-1 bg-gray-800 text-xs rounded border border-green-900/60',
		1: 'px-2 py-1 bg-green-900/40 text-xs rounded border border-green-900/60',
		2: 'px-2 py-1 bg-yellow-900/40 text-xs rounded border border-green-900/60',
		3: 'px-2 py-1 bg-red-900/40 text-xs rounded border border-green-900/60',
	};

	return Object.entries(config).map(([key, value]) => (
		<Badge
			onClick={() => setPriority(Number(key))}
			key={key}
			className={cn(
				'cursor-pointer text-primary',
				colors[Number(key)],
				Number(key) === priority && 'ring-primary ring-2',
			)}
		>
			{value}
		</Badge>
	));
};

export default PriorityBadge;
