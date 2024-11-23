import { createFileRoute } from '@tanstack/react-router';
import CreateAccountForm from '@/features/auth/components/CreateAccountForm';
import LoginForm from '@/features/auth/components/LoginForm';
import Heading from '@/components/Common/Heading';
import { useState } from 'react';
import { motion } from 'motion/react';

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
			<div className="bg-background-alt">photo </div>
		</div>
	);
};

export const Route = createFileRoute('/')({
	component: Home,
});
