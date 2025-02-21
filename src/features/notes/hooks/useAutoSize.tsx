import * as React from 'react';

export function useAutosize(): [React.RefCallback<HTMLTextAreaElement>, () => void] {
	const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

	const adjustHeight = React.useCallback(() => {
		const textarea = textareaRef.current;

		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, []);

	React.useLayoutEffect(() => {
		adjustHeight();
	}, [adjustHeight]);

	const setRef: React.RefCallback<HTMLTextAreaElement> = React.useCallback(
		(element) => {
			if (element) {
				textareaRef.current = element;
				adjustHeight();
			}
		},
		[adjustHeight],
	);

	return [setRef, adjustHeight];
}
