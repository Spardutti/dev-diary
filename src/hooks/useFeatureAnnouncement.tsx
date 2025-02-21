import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const FEATURE_ANNOUNCEMENT_KEY = 'featureCodeSnippets';

export function useFeatureAnnouncement() {
	const hasShownToast = useRef(false);

	useEffect(() => {
		if (hasShownToast.current) return;

		const hasSeenFeature = localStorage.getItem(FEATURE_ANNOUNCEMENT_KEY);

		if (!hasSeenFeature) {
			hasShownToast.current = true;
			toast(<ToastMessage />, {
				position: 'top-center',
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
				className: 'w-[400px]',
				onClose: () => localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true'),
			});
		}
	}, []);
}

const ToastMessage = () => (
	<div className="flex flex-col gap-1 text-white flex-grow w-[400px]">
		<p className="font-bold text-lg">✨ Code Snippets Are Here! 🚀</p>
		<p className="text-sm">
			Tired of digging through repos for that perfect snippet? Now you can
			<span className="font-bold text-md"> save, organize, and access </span>
			your favorite code snippets in one place. No more lost gems—your best code is just a click away! 💻🔥
		</p>
	</div>
);
