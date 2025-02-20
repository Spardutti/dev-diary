import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const FEATURE_ANNOUNCEMENT_KEY = 'featurePriorityTodo';

export function useFeatureAnnouncement() {
	const hasShownToast = useRef(false);

	useEffect(() => {
		if (hasShownToast.current) return;

		const hasSeenFeature = localStorage.getItem(FEATURE_ANNOUNCEMENT_KEY);

		if (!hasSeenFeature) {
			hasShownToast.current = true;
			toast(<ToastMessage />, {
				position: 'top-center',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
				onClose: () => localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true'),
			});
		}
	}, []);
}

const ToastMessage = () => (
	<div className="flex flex-col gap-1 text-white">
		<p className="font-bold text-lg">New Feature Announcement!</p>
		<p className="text-sm">
			Prioritize your tasks! You can now assign priorities to todos by editing them after creation. 🚀
		</p>
	</div>
);
