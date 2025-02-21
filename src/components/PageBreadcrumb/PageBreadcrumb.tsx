import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react/jsx-runtime';

interface PageBreadcrumbProps {
	routes: { path: string; name: string }[];
}

const PageBreadcrumb = ({ routes }: PageBreadcrumbProps) => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{routes.map(({ path, name }, index) => (
					<Fragment key={path}>
						<BreadcrumbItem key={path}>
							<BreadcrumbLink href={path}>{name}</BreadcrumbLink>
						</BreadcrumbItem>
						{routes.length - 1 !== index && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default PageBreadcrumb;
