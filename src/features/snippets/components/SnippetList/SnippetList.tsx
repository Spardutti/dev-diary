import SnippetCard from '@/features/snippets/components/SnippetCard';
import { useLoaderData } from '@tanstack/react-router';

const SnippetList = () => {
	const loaderData = useLoaderData({ from: '/_authenticated/projects/$projectId/snippets/' });

	console.log('loaderData:', loaderData);
	return (
		<div className="flex gap-2 flex-wrap">
			{loaderData.data.map((snippet) => (
				<SnippetCard
					snippet={snippet}
					key={snippet.id}
				/>
			))}
		</div>
	);
};

export default SnippetList;
