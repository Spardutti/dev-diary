import { FaArrowLeft } from 'react-icons/fa';

const Todos = () => {
	return (
		<div className="flex flex-grow border-l flex-col gap-2 flex-shrink-0 p-2 min-w-44">
			<div className="flex gap-2">
				<button>
					<FaArrowLeft />
				</button>
				<h1>Todos</h1>
			</div>

			<p>Todo 1</p>
			<p>Todo 3</p>
			<p>Todo 3</p>
		</div>
	);
};

export default Todos;
