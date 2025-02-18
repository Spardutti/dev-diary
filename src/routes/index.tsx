import { createFileRoute, redirect } from '@tanstack/react-router';
import CreateAccountForm from '@/features/auth/components/CreateAccountForm';
import LoginForm from '@/features/auth/components/LoginForm';
import { useState } from 'react';
import { motion } from 'motion/react';
import { axiosInstance, type IResponse } from '@/lib/axios';
import type { IUser } from '@/features/auth/types/IUser';
import type { AxiosError } from 'axios';
import Demo from '@/features/demo/components/Demo';

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
	beforeLoad: async ({ context }) => {
		// const token = localStorage.getItem('authToken');
		// if (token) {
		// 	const setProfile = context.authentication.setProfile;
		// 	let profile = context.queryClient.getQueryData<IResponse<IUser>>(['profile']);
		// 	if (!profile) {
		// 		const response = await fetchProfile(token);
		// 		if (response?.status && response.status >= 400) {
		// 			localStorage.removeItem('authToken');
		// 			redirect({ to: '/' });
		// 			return;
		// 		}
		// 		profile = response.data;
		// 	}
		// 	if (profile?.data) {
		// 		setProfile(profile.data);
		// 		return redirect({
		// 			to: '/projects/$projectId/dashboard',
		// 			// @ts-expect-error not converted to camelCase
		// 			params: { projectId: profile?.data?.last_visited_project },
		// 		});
		// 	}
		// }
	},

	component: Home,
});
