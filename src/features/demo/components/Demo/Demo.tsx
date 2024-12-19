import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notesFrom } from '@/features/utils/notesFrom';
import dayjs from 'dayjs';
import { TypeAnimation } from 'react-type-animation';

const Demo = () => {
	return (
		<Card className="flex flex-col flex-grow min-h-[300px]">
			<CardHeader className="flex flex-row items-center space-y-0">
				<CardTitle className="text-lg">{notesFrom(dayjs().format())}</CardTitle>
			</CardHeader>
			<CardContent>
				<TypeAnimation
					sequence={[
						'Spent the morning refactoring the React components for better reusability.',
						1000,
						'Fixed a bug in the state management causing stale todos to persist.',
						1000,
						'Implemented lazy loading for better performance on the dashboard.',
						1000,
						'Next step: write unit tests for the new `TodoList` component.',
						1000,
					]}
					wrapper="span"
					speed={50}
					style={{ display: 'inline-block' }}
					repeat={Infinity}
				/>
			</CardContent>
		</Card>
	);
};

export default Demo;
