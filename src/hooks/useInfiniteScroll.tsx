import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface useInfiniteScrollProps {
	observerRef: RefObject<HTMLDivElement>;
	hasNextPage: boolean;
	fetchNextPage: () => void;
}

const useInfiniteScroll = ({ observerRef, hasNextPage, fetchNextPage }: useInfiniteScrollProps) => {
	const [isUserInteracting, setIsUserInteracting] = useState(false); // Tracks user interaction

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;

				if (entry.isIntersecting && hasNextPage && isUserInteracting) {
					fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 1.0,
			},
		);

		const currentObserverRef = observerRef?.current;
		if (currentObserverRef) {
			observer.observe(currentObserverRef);
		}

		return () => {
			if (currentObserverRef) {
				observer.unobserve(currentObserverRef);
			}
		};
	}, [fetchNextPage, hasNextPage, observerRef, isUserInteracting]);

	// Track user interaction (e.g., scrolling)
	useEffect(() => {
		const onScroll = () => {
			setIsUserInteracting(true);
		};

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	// Trigger fetchNextPage automatically when the content height is too short
	useEffect(() => {
		const checkIfContentFitsViewport = () => {
			const contentHeight = document.body.scrollHeight;
			const viewportHeight = window.innerHeight;

			if (contentHeight <= viewportHeight && hasNextPage) {
				fetchNextPage();
			}
		};

		checkIfContentFitsViewport();

		window.addEventListener('resize', checkIfContentFitsViewport);

		return () => {
			window.removeEventListener('resize', checkIfContentFitsViewport);
		};
	}, [fetchNextPage, hasNextPage]);

	return null;
};

export default useInfiniteScroll;
