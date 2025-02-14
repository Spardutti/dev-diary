import { useEffect, useState } from 'react';

export const useDailyNoteContent = (content: string | undefined, noteId: string | undefined) => {
	const [noteContent, setNoteContent] = useState<string | undefined>();

	useEffect(() => {
		if (content && !noteContent) {
			setNoteContent(content);
		}
	}, [content, noteId]);

	return {
		noteContent,
		setNoteContent,
	};
};
