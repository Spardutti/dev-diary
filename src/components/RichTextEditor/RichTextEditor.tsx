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

const content =
	'<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const RichEditor = () => {
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
		],
		content,
	});

	return (
		<RichTextEditor
			ref={editorContainerRef}
			editor={editor}
			content={content}
			className="flex flex-grow p-6 cursor-text focus-within:bg-background-alt hover:bg-background-alt rounded"
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
