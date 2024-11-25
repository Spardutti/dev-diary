import { EditorProvider, FloatingMenu, BubbleMenu, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold } from 'react-icons/fa';

// define your extension array
const extensions = [StarterKit];

interface RichEditorProps {
	content?: string;
}

const RichEditor = ({ content }: RichEditorProps) => {
	return (
		<div className="editor-wrapper h-full">
			<EditorProvider
				extensions={extensions}
				content={content}
			>
				<FloatingMenu editor={null}>
					<MenuActions />
				</FloatingMenu>
				<BubbleMenu editor={null}>
					<MenuActions />
				</BubbleMenu>
			</EditorProvider>
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
