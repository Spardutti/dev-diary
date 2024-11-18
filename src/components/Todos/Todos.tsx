import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

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
		<div className="flex flex-grow border-l flex-col gap-2 flex-shrink-0 p-2 min-w-44 max-w-96">
			<div className="flex gap-2">
				<button>
					<FaArrowLeft />
				</button>
				<h1>Todos</h1>
			</div>

			<input
				className="text-black"
				value={input}
				onKeyDown={onEnter}
				onChange={onChange}
			/>

			{todos.map((todo, i) => (
				<div
					key={i}
					className="flex gap-2"
				>
					<input
						type="checkbox"
						checked={todo.checked}
						onChange={(e) => {
							const newTodos = [...todos];
							newTodos[i].checked = e.target.checked;
							setTodos(newTodos);
						}}
					/>
					<p className="break-words overflow-hidden">{todo.body}</p>
				</div>
			))}
		</div>
	);
};

export default Todos;
