import EditableField from '@/components/Common/EditableField';
import { useGetProjects } from '@/features/projects/api/projects';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown/ProjectSelectorDropdown';
import { useRef } from 'react';

// interface ProjectSelectorProps {
// }

const ProjectSelector = () => {
	const triggerRef = useRef(null);
	const { data: projects, isPending } = useGetProjects();

	if (isPending || !projects?.data)
		return (
			<div>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="flex gap-2 items-center">
			<div ref={triggerRef}>
				<EditableField value={projects.data[0].name} />
			</div>

			<ProjectSelectorDropDown />
		</div>
	);
};

export default ProjectSelector;
