import Button from '@/components/Common/Button';
import { useAuth } from '@/context/useAuth';

// interface HomeProps {}

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

export default Home;
