export function addMutationObserver(target, cb) {
	const observer = new MutationObserver(function(mutations) {
		cb();
		observer.disconnect();
	});

	observer.observe(target, { childList: true, subtree: true });
}
