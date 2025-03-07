const OBSERVER_OPTIONS: IntersectionObserverInit = {
	rootMargin: '0px',
	threshold: 1
};

export function infinityScroll(
	node: HTMLElement,
	options: { handleFetch: VoidFunction; isActive?: boolean }
) {
	const { handleFetch, isActive = true } = options;

	const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];

		if (!entry.isIntersecting) return;

		if (isActive) handleFetch();
	}, OBSERVER_OPTIONS);

	$effect(() => {
		observer.observe(node);

		return () => {
			observer.disconnect();
		};
	});
}
