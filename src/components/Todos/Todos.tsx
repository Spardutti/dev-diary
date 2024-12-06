import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

const Todos = () => {
	const [todos, setTodos] = useState<{ body: string; checked: boolean }[]>([]);
	const [input, setInput] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setTodos([...todos, { body: input, checked: false }]);
			setInput('');
		}
	};

	return (
		<aside className="hidden w-64 border-l border-l-separator bg-background lg:block">
			<div className="p-4">
				<h2 className="mb-4 text-lg font-semibold">Todos</h2>
				<div className="grid gap-4">
					<Input placeholder="Add a todo..." />
					<ScrollArea />
				</div>
			</div>
		</aside>
	);
};

export default Todos;
