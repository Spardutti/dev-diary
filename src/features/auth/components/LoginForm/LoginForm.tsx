import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGuestLogin, useLogin } from '@/features/auth/api/authQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginFormProps {
	handleSignUp: () => void;
}

const formSchema = z.object({
	email: z.string().min(2, {
		message: 'Project Name must be at least 2 characters.',
	}),
	password: z.string().min(4, {
		message: 'password must be at least 4 characters.',
	}),
});

const LoginForm = ({ handleSignUp }: LoginFormProps) => {
	const { mutateAsync: loginMutation, isPending: isLoginPending, error } = useLogin();
	const { mutateAsync: guestLoginMutation, isPending: isGuestLoginPending, error: guestLoginError } = useGuestLogin();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await loginMutation(values);
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

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-[300px]"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{(error || guestLoginError) && (
						<Alert variant="destructive">
							<AlertDescription>{(error?.toString() || guestLoginError?.toString()) ?? ''}</AlertDescription>
						</Alert>
					)}

					<div className="flex gap-4 justify-end">
						<Button
							variant="secondary"
							onClick={onGuestLogin}
							disabled={isLoginPending || isGuestLoginPending}
							isLoading={isGuestLoginPending}
							type="button"
						>
							Guest
						</Button>
						<Button
							type="submit"
							disabled={isLoginPending || isGuestLoginPending}
							isLoading={isLoginPending}
						>
							Log In
						</Button>
					</div>

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
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
