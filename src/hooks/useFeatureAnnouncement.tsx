import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const FEATURE_ANNOUNCEMENT_KEY = 'featureTodoChart';

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
				className: 'w-[400px]',
				onClose: () => localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true'),
			});

			localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true');
		}
	}, []);
}

const ToastMessage = () => {
	return (
		<div className="flex flex-col gap-1 text-white flex-grow w-[400px]">
			<p className="font-bold text-lg">📊 Stay on Track with Todo Insights!</p>
			<p className="text-sm">
				You can now view your <span className="font-bold">Todo Stats</span> — track how many tasks you’ve
				<span className="font-bold"> created</span> and <span className="font-bold">completed</span> over time! Check
				out the <span className="font-bold">Stats</span> section on your profile 👉
			</p>
		</div>
	);
};
