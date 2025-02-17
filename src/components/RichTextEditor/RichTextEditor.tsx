import { BubbleMenu, useCurrentEditor, useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { FaBold } from 'react-icons/fa';

// define your extension array
const extensions = [
	StarterKit,
	Placeholder.configure({ placeholder: 'Track progress, document issues, or list your todos...' }),
];

interface RichEditorProps {
	content: string | undefined;
	setContent: Dispatch<SetStateAction<string | undefined>>;
}

const RichEditor = ({ content, setContent }: RichEditorProps) => {
	const editor = useEditor({
		extensions,
		content,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			setContent(html);
		},
	});

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content ?? '', false); // Use false to not trigger update
		}
	}, [content, editor]);

	return (
		<div className="editor-wrapper h-full">
			{editor && (
				<>
					{/* Bubble Menu */}
					<BubbleMenu editor={editor}>
						<MenuActions />
					</BubbleMenu>

					{/* Editor Content */}
					<EditorContent
						defaultValue={content}
						editor={editor}
						className="prose focus:outline-none"
					/>
				</>
			)}
		</div>
	);
};

export default RichEditor;

const MenuActions = () => {
	const { editor } = useCurrentEditor();
	return (
		<div className="flex gap-2">
			<button onClick={() => editor?.chain().focus().toggleBold().run()}>
				<FaBold />
			</button>
		</div>
	);
};
