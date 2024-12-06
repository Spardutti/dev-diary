import { useGetProject } from '@/features/projects/api/projects';
import ProjectManagementDropdown from '@/features/projects/components/ProjectManagementDropdown';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';
import { useParams } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';

const ProjectSelector = () => {
	

	return (
		<div className="flex gap-2 items-center">
			<div className="flex items-center gap-2 px-4 py-2 transition-colors rounded">
				{/* <ProjectManagementDropdown project={project.data} /> */}
				
			</div>

			<ProjectSelectorDropDown />
		</div>
	);
};

export default ProjectSelector;
