export const setTextRangeAtStartEnd = (start, node) => {
	node = node.lastChild || node;
	const sel = document.getSelection();

	if (sel.rangeCount) {
		['Start', 'End'].forEach((pos) => sel.getRangeAt(0)['set' + pos](node, start ? 0 : node.length));
	}
};
