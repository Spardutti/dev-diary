export const parseHtmlToText = (html: string): string => {
	const tempElement = document.createElement('div');
	tempElement.innerHTML = html; // Convert HTML string into a DOM element

	return tempElement.innerHTML
		.replace(/<strong>|<b>/g, '*') // Bold to *bold*
		.replace(/<\/strong>|<\/b>/g, '*')
		.replace(/<em>|<i>/g, '_') // Italics to _italic_
		.replace(/<\/em>|<\/i>/g, '_')
		.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)') // Links to [text](url)
		.replace(/<p>/g, '\n\n') // Paragraphs to newlines
		.replace(/<\/p>/g, '')
		.replace(/<br\s*\/?>/g, '\n'); // Convert <br> to newlines
};
