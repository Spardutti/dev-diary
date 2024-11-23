import Button from '@/components/Common/Button';
import Form from '@/components/Common/Form/Form';
import InputField from '@/components/Common/InputField';

interface ICreateAccountFormValues {
	email: string;
	password: string;
}

interface CreateAccountFormProps {
	handleSignUp: () => void;
}

const CreateAccountForm = ({ handleSignUp }: CreateAccountFormProps) => {
	const onSubmit = async (data: ICreateAccountFormValues) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col justify-center items-center gap-10">
			<div>
				<p className="text-3xl tracking-widest">Create Account</p>
				<p className="text-md">Please enter your details</p>
			</div>
			<Form<ICreateAccountFormValues>
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
					autoComplete="new-password"
					type="password"
					name="password"
					placeholder="enter your password"
				>
					Password
				</InputField>

				<Button type="submit"> Create</Button>

				<p className="text-center">
					have an account ?{' '}
					<button
						onClick={handleSignUp}
						className="text-secondary underline"
					>
						Log In
					</button>
				</p>
			</Form>
		</div>
	);
};

export default CreateAccountForm;
