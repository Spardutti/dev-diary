import { Badge } from '@/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { useMatches } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

const methodColors: Record<'GET' | 'PUT' | 'POST', string> = {
	GET: 'bg-blue-500 hover:bg-blue-600',
	POST: 'bg-green-500 hover:bg-green-600',
	PUT: 'bg-orange-500 hover:bg-orange-600',
};

const PageBreadcrumb = () => {
	const matches = useMatches();

	const lastMatch = matches[matches.length - 1];

	const method = lastMatch?.context.routeMethod || 'GET';

	const breadcrumbs = Array.from(
		new Map(
			matches
				.filter((match) => match.context.routeTitle)
				.map(({ pathname, context }) => [context.routeTitle, { title: context.routeTitle, path: pathname }]),
		).values(),
	);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="pr-4">
					<Badge className={cn('font-mono font-bold text-white', methodColors[method as 'GET' | 'PUT' | 'POST'])}>
						{method}
					</Badge>
				</BreadcrumbItem>
				<BreadcrumbSeparator> /</BreadcrumbSeparator>
				{breadcrumbs.map(({ path, title }, index) => (
					<Fragment key={path}>
						<BreadcrumbItem key={path}>
							<BreadcrumbLink
								className="hover:text-primary"
								href={path}
							>
								{title}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{breadcrumbs.length - 1 !== index && <BreadcrumbSeparator> / </BreadcrumbSeparator>}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default PageBreadcrumb;
