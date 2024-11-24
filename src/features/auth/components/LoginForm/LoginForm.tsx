import Alert from '@/components/Common/Alert';
import Button from '@/components/Common/Button';
import Form from '@/components/Common/Form/Form';
import InputField from '@/components/Common/InputField';
import { useGuestLogin, useLogin } from '@/features/auth/api/auth';

interface ILoginAccountFormValues {
	email: string;
	password: string;
}

interface LoginFormProps {
	handleSignUp: () => void;
}

const LoginForm = ({ handleSignUp }: LoginFormProps) => {
	const { mutateAsync: loginMutation, isPending: isLoginPending, error } = useLogin();
	const { mutateAsync: guestLoginMutation, isPending: isGuestLoginPending, error: guestLoginError } = useGuestLogin();

	const onSubmit = async (data: ILoginAccountFormValues) => {
		await loginMutation(data);
	};

	const onGuestLogin = async () => {
		await guestLoginMutation();
	};

	return (
		<div className="flex flex-col justify-center items-center gap-10">
			<div>
				<p className="text-3xl tracking-widest">Welcome Back</p>
				<p className="text-md">Please enter your details</p>
			</div>
			<Form<ILoginAccountFormValues>
				className="space-y-6 w-[400px]"
				defaultValues={{ email: '', password: '' }}
				onSubmit={onSubmit}
			>
				<InputField
					autoComplete="username"
					name="email"
					placeholder="enter your email"
				>
					Email
				</InputField>

				<InputField
					autoComplete="current-password"
					type="password"
					name="password"
					placeholder="enter your password"
				>
					Password
				</InputField>
				{(error || guestLoginError) && (
					<Alert
						variant="error"
						message={error || guestLoginError}
					/>
				)}

				<Button
					type="submit"
					isDisabled={isLoginPending || isGuestLoginPending}
					isLoading={isLoginPending}
				>
					Log In
				</Button>

				<Button
					variant="secondary"
					onPress={onGuestLogin}
					isDisabled={isLoginPending || isGuestLoginPending}
					isLoading={isGuestLoginPending}
					type="button"
				>
					Guest
				</Button>

				<p className="text-center">
					Don&apos;t have an account ?{' '}
					<button
						type="button"
						onClick={handleSignUp}
						className=" underline text-secondary"
					>
						Sign up
					</button>
				</p>
			</Form>
		</div>
	);
};

export default LoginForm;
