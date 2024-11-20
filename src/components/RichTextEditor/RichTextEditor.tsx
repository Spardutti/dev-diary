import type { Editor } from '@tiptap/react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';

interface RichEditorProps {
	content: string;
}

const RichEditor = ({ content }: RichEditorProps) => {
	return <p>asd</p>;
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
