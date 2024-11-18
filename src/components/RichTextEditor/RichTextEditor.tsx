import { RichTextEditor, Link } from '@mantine/tiptap';
import type { Editor } from '@tiptap/react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useRef } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import ListItem from '@tiptap/extension-list-item';

interface RichEditorProps {
	content: string;
}

const RichEditor = ({ content }: RichEditorProps) => {
	const editorContainerRef = useRef<HTMLDivElement>(null);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Placeholder.configure({ placeholder: 'Todays notes' }),
			TaskList,
			TaskItem,
			ListItem,
		],

		content,
	});

	return (
		<RichTextEditor
			ref={editorContainerRef}
			editor={editor}
			content={content}
		>
			{editor && <Bubble editor={editor} />}
			<RichTextEditor.Content />
		</RichTextEditor>
	);
};

export default RichEditor;

const Bubble = ({ editor }: { editor: Editor }) => {
	return (
		<BubbleMenu
			editor={editor}
			tippyOptions={{ duration: 100 }}
		>
			<div className="flex p-2 gap-2 bg-primary rounded">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
				>
					<FaBold className={editor.isActive('bold') ? 'text-background' : ''} />
				</button>

				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
				>
					<FaItalic className={editor.isActive('italic') ? 'text-background' : ''} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'is-active' : ''}
				>
					<FaStrikethrough className={editor.isActive('strike') ? 'text-background' : ''} />
				</button>
			</div>
		</BubbleMenu>
	);
};
