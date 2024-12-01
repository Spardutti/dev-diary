import { useGetProject } from '@/features/projects/api/projects';
import ProjectManagementDropdown from '@/features/projects/components/ProjectManagementDropdown';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';
import { useParams } from '@tanstack/react-router';

/ 

const ProjectSelector = () => {
	const { projectId } = useParams({ strict: false });
	const { data: project, isPending } = useGetProject(projectId!);

	if (isPending || !project?.data) return <div className="animate-pulse h-8 w-[120px]" />;

	return (
		<div className="flex gap-2 items-center">
			<div className="flex items-center gap-2 px-4 py-2 transition-colors rounded">
				<ProjectManagementDropdown project={project.data} />
				<span className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
					{project.data.name}
				</span>
			</div>

			<ProjectSelectorDropDown />
		</div>
	);
};

export default ProjectSelector;
