import clsx from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';
import type { DefaultValues, SubmitHandler, FieldValues } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface FormProps<T extends Record<string, unknown>> {
	defaultValues: DefaultValues<T>;
	children: ReactNode;
	onSubmit: SubmitHandler<T>;
	className?: string;
}

const Form = <T extends FieldValues>({ defaultValues, children, onSubmit, className }: FormProps<T>) => {
	const methods = useForm({ defaultValues });
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = methods;

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={clsx('flex flex-col gap-4', className)}
			>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child) && child.props.name) {
						const { name } = child.props;

						return (
							<Controller
								control={control}
								name={name}
								render={({ field }) => (
									<>
										{React.cloneElement(child, {
											name: field.name,
											value: field.value,
											onChange: field.onChange,
											...child.props,
										})}

										{errors[name] && (
											<span className="text-sm text-error-main">
												{typeof errors[name]?.message === 'string' ? (errors[name]?.message as string) : ''}
											</span>
										)}
									</>
								)}
							/>
						);
					}
					return child;
				})}
			</form>
		</FormProvider>
	);
};

export default Form;
