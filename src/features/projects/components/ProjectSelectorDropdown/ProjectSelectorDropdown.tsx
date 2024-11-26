import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetProjects } from '@/features/projects/api/projects';
import NewProjectForm from '@/features/projects/components/NewProjectForm/NewProjectForm';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { FaChevronDown, FaPlusCircle } from 'react-icons/fa';

const ProjectSelectorDropDown = () => {
	const { data: projects } = useGetProjects();

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<FaChevronDown />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{projects?.data.map((project) => <DropdownMenuItem key={project.id}>{project.name}</DropdownMenuItem>)}
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<DialogTrigger className="flex gap-2">
							<FaPlusCircle /> Create Project
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogBody />
		</Dialog>
	);
};

export default ProjectSelectorDropDown;

const DialogBody = () => (
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Create new project</DialogTitle>
			<DialogDescription>
				<NewProjectForm />
			</DialogDescription>
		</DialogHeader>
	</DialogContent>
);
