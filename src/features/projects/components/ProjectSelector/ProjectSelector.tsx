import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Popover from '@/components/Common/Popover';
import { useGetProjects } from '@/features/projects/api/projects';
import { useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

// interface ProjectSelectorProps {
// }

const ProjectSelector = () => {
	let [isOpen, setOpen] = useState(false);
	let triggerRef = useRef(null);
	const { data: projects, isPending } = useGetProjects();

	if (isPending && !projects)
		return (
			<div>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="flex gap-2 items-baseline">
			<div ref={triggerRef}>
				<Heading
					variant="h2"
					textSize="2xl"
				>
					{projects?.data[0]?.name}
				</Heading>
			</div>
			<Button onPress={() => setOpen(!isOpen)}>
				<FaChevronDown />
			</Button>
			<Popover
				isOpen={isOpen}
				setOpen={setOpen}
				triggerRef={triggerRef}
			>
				{projects?.data &&
					projects?.data?.length > 0 &&
					projects?.data.map((project) => (
						<Button
							onPress={() => console.log('pepe')}
							key={project.id}
						>
							{project.name}
						</Button>
					))}
			</Popover>
		</div>
	);
};

export default ProjectSelector;
