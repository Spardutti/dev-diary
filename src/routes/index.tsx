import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'react-aria-components';
import { useAuth } from '@/context/useAuth';

const Home = () => {
	const { guestLogin } = useAuth();

	return (
		<div className="bg-background flex flex-col gap-2 h-screen text-text">
			<p>This is home</p>
			<div>
				<Button onPress={guestLogin}>Guest Login</Button>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/')({
	component: Home,
});
