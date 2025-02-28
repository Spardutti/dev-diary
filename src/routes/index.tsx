import { createFileRoute, redirect } from '@tanstack/react-router';
import CreateAccountForm from '@/features/auth/components/CreateAccountForm';
import LoginForm from '@/features/auth/components/LoginForm';
import { useState } from 'react';
import { motion } from 'motion/react';
import Demo from '@/features/demo/components/Demo';
import { me } from '@/features/auth/api/authApi';
import { authQueryKeys } from '@/features/auth/api/authQueries';
import { setDefaultHeaders } from '@/lib/axios';
import RetroLoadingOverlay from '@/components/RetroLoadingOverlay';

const Home = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const handleSignUp = () => {
		setShowSignUp((prev) => !prev);
	};

	return (
		<div className="grid md:grid-cols-2 h-screen overflow-y-auto retro-container text-primary">
			<div className="bg-background p-10 text-text flex-grow flex flex-col">
				<h1>
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold tracking-wide glow-text">[</span>
						<span className="text-xl font-bold tracking-wide glow-text">DevDiary</span>
						<span className="text-xl font-bold tracking-wide glow-text">]</span>
					</div>
				</h1>

				<motion.div
					animate={{ rotateY: showSignUp ? 180 : 0 }} // Rotate the card
					initial={{ rotateY: 0 }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
					style={{
						transformStyle: 'preserve-3d', // Preserve the 3D effect
					}}
					className="flex justify-center items-center flex-grow"
				>
					{/* Front Side */}
					<motion.div
						className="absolute flex inset-0 flex-col flex-grow justify-center gap-10 items-center rounded-lg shadow-lg backface-hidden"
						style={{ backfaceVisibility: 'hidden' }}
					>
						<LoginForm handleSignUp={handleSignUp} />
					</motion.div>

					{/* Back Side */}
					<motion.div
						className="absolute flex inset-0 flex-col flex-grow justify-center gap-10 items-center rounded-lg shadow-lg backface-hidden"
						style={{
							transform: 'rotateY(180deg)',
							backfaceVisibility: 'hidden',
						}}
					>
						<CreateAccountForm handleSignUp={handleSignUp} />
					</motion.div>
				</motion.div>
			</div>
			<div className="bg-neutral-950 gap-2 md:flex hidden px-6 justify-center items-center flex-col">
				<div className="w-full">
					<Demo />
				</div>
				<p className="text-sm">
					This demo showcases real-time note-taking in Dev Diary. <br /> Imagine capturing your coding insights as they
					happen!
				</p>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setDefaultHeaders(token);
		}
	},
	pendingComponent: () => <RetroLoadingOverlay isLoading />,
	loader: async ({ context }) => {
		const { queryClient } = context;
		const token = localStorage.getItem('authToken');

		try {
			if (token) {
				const response = await queryClient.ensureQueryData({
					queryKey: authQueryKeys.all,
					queryFn: me,
				});
				if (response.status === 200) {
					return redirect({
						to: '/projects/$projectId/dashboard',
						params: { projectId: response.data.lastVisitedProjectId },
					});
				}
			}
		} catch (error) {
			console.log('error:', error);
			localStorage.removeItem('authToken');
		}
	},

	component: Home,
});
