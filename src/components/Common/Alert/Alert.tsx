import clsx from 'clsx';

interface AlertProps {
	variant: 'success' | 'error' | 'warning' | 'info';
	message: string | Error;
}

const Alert = ({ variant, message }: AlertProps) => {
	const parseError = (error: Error | string) => {
		if (error instanceof Error) {
			return error.message;
		}
		return error;
	};
	const variants = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		warning: 'bg-yellow-500',
		info: 'bg-blue-500',
	};

	return (
		<div className={clsx('min-h-[60px] rounded flex items-center justify-center', variants[variant])}>
			<p>{parseError(message)}</p>
		</div>
	);
};

export default Alert;
