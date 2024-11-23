import Button from '@/components/Common/Button';
import Form from '@/components/Common/Form/Form';
import InputField from '@/components/Common/InputField';
import { useAuth } from '@/context/useAuth';

interface ILoginAccountFormValues {
	email: string;
	password: string;
}

interface LoginFormProps {
	handleSignUp: () => void;
}

const LoginForm = ({ handleSignUp }: LoginFormProps) => {
	const { guestLogin } = useAuth();

	const onSubmit = async (data: ILoginAccountFormValues) => {
		console.log(data);
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

				<Button type="submit"> Log In</Button>

				<Button
					variant="secondary"
					onPress={guestLogin}
					type="button"
				>
					Guest
				</Button>

				<p className="text-center">
					Don&apos;t have an account ?{' '}
					<button
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
