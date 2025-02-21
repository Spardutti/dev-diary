import { createFileRoute, redirect } from '@tanstack/react-router';
import CreateAccountForm from '@/features/auth/components/CreateAccountForm';
import LoginForm from '@/features/auth/components/LoginForm';
import { useState } from 'react';
import { motion } from 'motion/react';
import Demo from '@/features/demo/components/Demo';
import { me } from '@/features/auth/api/authApi';
import { authQueryKeys } from '@/features/auth/api/authQueries';
import { setDefaultHeaders } from '@/lib/axios';
import { router } from '@/App';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const handleSignUp = () => {
		setShowSignUp((prev) => !prev);
	};

	return (
		<div className="grid grid-cols-2 h-screen">
			<div className="bg-background p-10 text-text flex-grow flex flex-col">
				<h1>Dev Diary</h1>

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
			<div className="bg-background-alt gap-2 flex px-6 justify-center items-center flex-col">
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

		if (!token) {
			throw redirect({
				to: '/',
			});
		}

		setDefaultHeaders(token);
	},
	pendingComponent: () => <Skeleton className="w-full h-full p-4" />,

	loader: async ({ context }) => {
		const { queryClient } = context;
		try {
			const response = await queryClient.ensureQueryData({
				queryKey: authQueryKeys.all,
				queryFn: me,
			});

			return redirect({
				to: '/projects/$projectId/dashboard',
				params: { projectId: response.data.lastVisitedProjectId },
			});
		} catch (error) {
			console.log('error:', error);
			localStorage.removeItem('authToken');
			return router.navigate({ to: '/' });
		}
	},

	component: Home,
});
