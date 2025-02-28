'use client';

import { useEffect, useState } from 'react';

const RetroLoadingOverlay = ({ isLoading, message = 'LOADING DATA' }: { isLoading: boolean; message?: string }) => {
	const [dots, setDots] = useState('');
	const [progress, setProgress] = useState(0);
	const [statusText, setStatusText] = useState('');
	const statusMessages = [
		'ACCESSING DATABASE',
		'RETRIEVING DATA',
		'DECRYPTING FILES',
		'INITIALIZING SYSTEM',
		'ESTABLISHING CONNECTION',
	];

	useEffect(() => {
		if (!isLoading) return;

		// Animated dots
		const dotsInterval = setInterval(() => {
			setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
		}, 300);

		// Progress bar animation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + Math.floor(Math.random() * 5) + 1;
				return next > 100 ? 100 : next;
			});
		}, 200);

		// Random status messages
		const statusInterval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * statusMessages.length);
			setStatusText(statusMessages[randomIndex]);
		}, 2000);

		return () => {
			clearInterval(dotsInterval);
			clearInterval(progressInterval);
			clearInterval(statusInterval);
		};
	}, [isLoading]);

	if (!isLoading) return null;

	return (
		<div className="absolute inset-0 bg-black/90 z-50 font-mono text-green-400 flex items-center justify-center">
			<div className="max-w-md w-full p-6 border-2 border-green-500 bg-black relative overflow-hidden">
				{/* Scan line effect is inherited from parent retro-container */}

				{/* Blinking cursor in corner */}
				<div className="absolute top-2 right-3 h-3 w-3 bg-green-500 animate-pulse" />

				{/* Header */}
				<div className="text-center mb-6">
					<h2 className="text-xl font-bold tracking-widest glow-text">
						{message}
						{dots}
					</h2>
					<p className="text-xs mt-1 text-green-400/70">PLEASE STAND BY</p>
				</div>

				{/* ASCII Progress Bar */}
				<div className="mb-4">
					<div className="flex items-center mb-1">
						<span className="text-xs mr-2">PROGRESS:</span>
						<span className="text-xs ml-auto">{progress}%</span>
					</div>
					<div className="h-6 w-full border border-green-500 p-1 bg-black/50 relative">
						<div
							className="h-full bg-green-500/50"
							style={{ width: `${progress}%` }}
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-full px-2 overflow-hidden">
								<div className="flex">
									{Array.from({ length: Math.floor(progress / 5) }).map((_, i) => (
										<span
											key={i}
											className="text-green-900 font-bold"
										>
											█
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Status Console */}
				<div className="border border-green-900 bg-black/80 p-2 h-24 overflow-hidden mb-4">
					<div className="text-xs font-mono text-green-400/90 h-full overflow-hidden">
						<p>{'>'} SYSTEM INITIALIZING...</p>
						<p>{'>'} CHECKING RESOURCES...</p>
						<p>
							{'>'} {statusText}
							{dots}
						</p>
						<p className="flex">
							<span>{'>'}</span>
							<span className="h-4 w-2 bg-green-400 animate-pulse ml-1" />
						</p>
					</div>
				</div>

				{/* Retro Computer Animation */}
				<div className="text-center text-xs text-green-400/70 ascii-art">
					<pre className="inline-block text-left">
						{`  _____________________
 /                    /|
/_____________________/ |
|  ________________  |  |
| |                | |  |
| |                | |  |
| |                | |  |
| |________________| |  |
|/__________________/|  /
|                    | /
|____________________|/`}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default RetroLoadingOverlay;
