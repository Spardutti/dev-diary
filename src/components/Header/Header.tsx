import { useAuth } from '@/context/useAuth';
import ProjectSelector from '@/features/projects/components/ProjectSelector';

const Header = () => {
	const { profile } = useAuth();

	return (
		<div className=" border-b border-b-secondary">
			<p>Header</p>
			<div className="flex">
				<ProjectSelector />
			</div>
			<p>{profile?.email}</p>
		</div>
	);
};

export default Header;
