import Heading from '@/components/Common/Heading';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth';
import ProjectSelector from '@/features/projects/components/ProjectSelector';

const Header = () => {
	const { profile, logout } = useAuth();

	return (
		<div className=" border-b border-b-secondary flex justify-between items-center px-2 h-16">
			<Heading
				variant={1}
				textSize="2xl"
			>
				DevDiary
			</Heading>

			<ProjectSelector />
			<Button
				type="button"
				onClick={logout}
			>
				{profile?.email}
			</Button>
		</div>
	);
};

export default Header;
