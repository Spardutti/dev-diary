import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const FEATURE_ANNOUNCEMENT_KEY = 'featureDailySummary';

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

			localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true');
		}
	}, []);
}

const ToastMessage = () => (
	<div className="flex flex-col gap-1 text-white flex-grow w-[400px]">
		<p className="font-bold text-lg">✨ Stay on Track with Daily Summaries! 📅</p>
		<p className="text-sm">
			Keep up with your progress effortlessly! Each day, you can generate a summary of your
			<span className="font-bold"> notes, completed tasks,</span> and <span className="font-bold">pending todos</span>.
			No more missed details—just a quick snapshot of your day! 🚀
		</p>
	</div>
);
