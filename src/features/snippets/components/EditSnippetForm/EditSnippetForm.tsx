import { useUpdateSnippet } from '@/features/snippets/api/snippetQueries';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useParams } from '@tanstack/react-router';
import CodeBlock from '@/features/snippets/components/CodeBlock';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema: z.ZodType<Partial<ISnippet>> = z.object({
	title: z.string().min(1, 'title is required'),
	description: z.string().min(1, 'description required'),
	code: z.string().min(1, 'code is required'),
	language: z.string().min(1, 'please select a language'),
});

const EditSnippetForm = ({ snippet }: { snippet: ISnippet }) => {
	const { mutateAsync: updateSnippet, isPending: isUpdatingSnippet } = useUpdateSnippet();
	const navigate = useNavigate();
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/snippets/$snippetId/edit' });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: snippet.title,
			description: snippet.description,
			code: snippet.code,
			language: snippet.language,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await updateSnippet({ ...values, id: snippet.id });
		navigate({ to: '/projects/$projectId/snippets/$snippetId', params: { projectId, snippetId: snippet.id } });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-[600px] overflow-hidden shadow-md p-4 rounded"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Name</FormLabel>
							<FormControl>
								<Input
									placeholder="snippet name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Description</FormLabel>
							<FormControl>
								<Input
									placeholder="snippet description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<FormControl>
								<LanguageSelect
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code block</FormLabel>
							<FormControl>
								<Textarea
									placeholder="code"
									{...field}
								/>
							</FormControl>
							<p>Code Preview</p>
							<CodeBlock
								code={field.value || ''}
								language={form.watch('language') || 'javascript'}
								maxHeight="300"
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isUpdatingSnippet}
					isLoading={isUpdatingSnippet}
					type="submit"
				>
					Update
				</Button>
			</form>
		</Form>
	);
};

export default EditSnippetForm;

const LanguageSelect = ({ value, onChange }: { value: string | undefined; onChange: (value: string) => void }) => {
	const languages = {
		Ruby: 'rb',
		Javascript: 'js',
		Typescript: 'ts',
		Rust: 'rust',
		'Javascript React': 'jsx',
		'Typescript React': 'tsx',
		Python: 'py',
		CSharp: 'cs',
		'Shell session': 'shell-session',
		'C++': 'cpp',
		CSS: 'css',
		SQL: 'sql',
		GO: 'go',
		JSON: 'json',
		JSON5: 'json5',
		YAML: 'yaml',
	};

	return (
		<Select
			value={value}
			onValueChange={onChange}
		>
			<SelectTrigger>
				<SelectValue placeholder="Select a language" />
			</SelectTrigger>
			<SelectContent>
				{Object.entries(languages)
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([key, value]) => (
						<SelectItem
							key={key}
							value={value}
						>
							{key}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};
