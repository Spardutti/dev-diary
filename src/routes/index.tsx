import { createFileRoute, redirect } from '@tanstack/react-router';
import CreateAccountForm from '@/features/auth/components/CreateAccountForm';
import LoginForm from '@/features/auth/components/LoginForm';
import Heading from '@/components/Common/Heading';
import { useState } from 'react';
import { motion } from 'motion/react';
import { axiosInstance, type IResponse } from '@/lib/axios';
import type { IUser } from '@/features/auth/types/IUser';

const Home = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const handleSignUp = () => {
		setShowSignUp((prev) => !prev);
	};

	return (
		<div className="grid grid-cols-2 h-screen">
			<div className="bg-background p-10 text-text flex-grow flex flex-col">
				<Heading
					variant={1}
					textSize="2xl"
				>
					Dev Diary
				</Heading>

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
			<div className="bg-background-alt"> </div>
		</div>
	);
};

export const Route = createFileRoute('/')({
	beforeLoad: async ({ context }) => {
		const token = localStorage.getItem('authToken');
		if (token) {
			const setToken = context.authentication.setToken;
			setToken(token);

			let profile = context.queryClient.getQueryData<IResponse<IUser>>(['profile']);
			if (!profile) {
				const response = await fetchProfile(token);
				profile = response.data;
			}

			if (profile?.data) {
				return redirect({
					to: '/projects/$projectId/dashboard',
					// @ts-expect-error not converted to camelCase
					params: { projectId: profile?.data?.last_project },
				});
			}
		}
	},

	component: Home,
});

async function fetchProfile(token: string) {
	const response = await axiosInstance('/users/', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}
