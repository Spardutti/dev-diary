import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@/features/auth/api/authQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(3),
});

interface CreateAccountFormProps {
	handleSignUp: () => void;
}

const CreateAccountForm = ({ handleSignUp }: CreateAccountFormProps) => {
	const [showSuccess, setShowSuccess] = useState<boolean>(false);

	const { mutateAsync: signup, isPending, error } = useSignUp();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const response = await signup(data);

		if (response.status === 201) {
			setShowSuccess(true);
			setTimeout(() => {
				handleSignUp();
				setShowSuccess(false);
				toast.success('Account created successfully');
			}, 1000);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center gap-10">
			<div>
				<p className="text-3xl tracking-widest">Create Account</p>
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
										placeholder="Enter your email..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your name..."
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
										placeholder="Enter your password..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error?.toString() ?? ''}</AlertDescription>
						</Alert>
					)}

					<Button
						isLoading={isPending}
						disabled={isPending || showSuccess}
						type="submit"
					>
						Create
					</Button>

					<p className="text-center">
						have an account ?{' '}
						<button
							type="button"
							onClick={handleSignUp}
							className="text-secondary underline"
						>
							Log In
						</button>
					</p>
				</form>
			</Form>
		</div>
	);
};

export default CreateAccountForm;
