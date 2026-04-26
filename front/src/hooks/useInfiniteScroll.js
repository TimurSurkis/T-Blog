import { useEffect, useRef } from 'react';

export function useInfiniteScroll(onIntersect, enabled) {
	const sentinelRef = useRef(null);

	useEffect(() => {
		if (!enabled) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onIntersect();
				}
			},
			{
				rootMargin: '0px 0px 200px 0px',
			},
		);

		const sentinel = sentinelRef.current;
		if (sentinel) observer.observe(sentinel);

		return () => {
			if (sentinel) observer.unobserve(sentinel);
		};
	}, [onIntersect, enabled]);

    return sentinelRef;
}
