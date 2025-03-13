import {
	FormProvider,
	getFieldsetProps,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Upload, UserRound, X } from 'lucide-react'
import { Img } from 'openimg/react'
import React, { useMemo, useState } from 'react'
import { Form } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Info } from './+types/$username.ts'
import { ErrorList, Field } from '@/components/forms.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Label } from '@/components/ui/label.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { cn } from '@/lib/utils.ts'
import { getUserImgSrc, useIsPending } from '@/utils/misc.tsx'
import {
	EmailSchema,
	NameSchema,
	UsernameSchema,
} from '@/utils/user-validation.ts'

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const ImageSchema = z.object({
	id: z.string().optional(),
	file: z
		.instanceof(File)
		.optional()
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE
		}, 'File size must be less than 3MB'),
})

export const UserFormSchema = z.object({
	id: z.string().optional(),
	name: NameSchema,
	username: UsernameSchema,
	// roles: RolesSchema.default(['user']),
	email: EmailSchema,
	image: ImageSchema,
})

function UserForm({
	user,
	actionData,
}: {
	user?: Info['loaderData']['user']
	actionData?: Info['actionData']
} & React.ComponentProps<'div'>) {
	const isPending = useIsPending()

	const defaultValue = {
		id: actionData?.user?.id ?? user?.id,
		name: actionData?.user?.name ?? user?.name,
		username: actionData?.user?.username ?? user?.username,
		email: actionData?.user?.email ?? user?.email,
	}

	const [form, fields] = useForm({
		id: 'user-form',
		constraint: getZodConstraint(UserFormSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserFormSchema })
		},
		defaultValue: { ...defaultValue },
		shouldDirtyConsider(fieldName) {
			// ignore honeypot input
			return !['from__confirm', 'image'].includes(fieldName)
		},
		shouldRevalidate: 'onBlur',
	})
	const isExistingImage = Boolean(fields.id.initialValue)
	const imageFieldset = fields.image.getFieldset()
	const initialImage = useMemo(
		() => getUserImgSrc(user?.image?.objectKey || null),
		[user?.image?.objectKey],
	)
	const [previewImage, setPreviewImage] = useState<string | null>(initialImage)

	return (
		<FormProvider context={form.context}>
			<Form
				method="POST"
				className="flex h-full max-w-md flex-col gap-2"
				{...getFormProps(form)}
				encType="multipart/form-data"
			>
				<HoneypotInputs />
				{/*
					This hidden submit button is here to ensure that when the user hits
					"enter" on an input field, the primary form function is submitted
					rather than the first button in the form (which is delete/add image).
				*/}
				<button type="submit" className="hidden" />
				{user ? <input type="hidden" name="id" value={user.id} /> : null}
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor={imageFieldset.file.id}>Image</Label>
						<div className="border-muted-foreground relative">
							<fieldset {...getFieldsetProps(fields.image)}>
								<div className="flex gap-3">
									<div className={cn('flex gap-4')}>
										<ProfileImage
											previewImage={
												imageFieldset.file.dirty ? previewImage : initialImage
											}
										/>
										{isExistingImage ? (
											<input
												{...getInputProps(imageFieldset.id, {
													type: 'hidden',
												})}
												key={imageFieldset.id.key}
											/>
										) : null}
										<div className="flex flex-col justify-center gap-1 text-xs">
											<div className="flex gap-2">
												<div className="relative flex gap-2">
													<Button
														type="button"
														variant="outline"
														size="sm"
														asChild
														className="focus-within:ring-border text-sm text-xs focus-within:ring-2"
													>
														<label htmlFor={imageFieldset.file.id}>
															<Upload />
															Select image
															<input
																{...getInputProps(imageFieldset.file, {
																	type: 'file',
																})}
																key={imageFieldset.file.key}
																aria-label="Image"
																className="sr-only absolute top-0 left-0 z-0 size-full cursor-pointer"
																onChange={(event) => {
																	const file = event.target.files?.[0]

																	if (file) {
																		const reader = new FileReader()
																		reader.onloadend = () => {
																			setPreviewImage(reader.result as string)
																		}
																		reader.readAsDataURL(file)
																	} else {
																		setPreviewImage(null)
																	}
																}}
																accept="image/*"
															/>
														</label>
													</Button>
													{imageFieldset.file.dirty && (
														<Button
															variant="outline"
															type="button"
															size="icon"
															className="text-destructive-foreground border-destructive size-8"
															onClick={() =>
																form.reset({
																	name: 'image',
																})
															}
														>
															<X />
														</Button>
													)}
												</div>
											</div>
											<div className="text-muted-foreground">
												File size must not exceed 3MB.
											</div>
										</div>
									</div>
									<ErrorList
										id={imageFieldset.file.errorId}
										errors={imageFieldset.file.errors}
									/>
								</div>
								<ErrorList
									id={fields.image.errorId}
									errors={fields.image.errors}
								/>
							</fieldset>
						</div>
					</div>
					<Field
						className="grid gap-2"
						labelProps={{ children: 'Name' }}
						inputProps={{
							...getInputProps(fields.name, { type: 'text' }),
							autoFocus: true,
							autoComplete: 'name',
							key: fields.name.key,
						}}
						errors={fields.name.errors}
					/>
					<Field
						className="grid gap-2"
						labelProps={{ children: 'Email' }}
						inputProps={{
							...getInputProps(fields.email, {
								type: 'text',
							}),
							autoComplete: 'email',
							key: fields.email.key,
						}}
						errors={fields.email.errors}
					/>
					<Field
						className="grid gap-2"
						labelProps={{ children: 'Username' }}
						inputProps={{
							...getInputProps(fields.username, {
								type: 'text',
								key: fields.username.key,
							}),
							autoComplete: 'username',
						}}
						errors={fields.username.errors}
					/>
					<div className="flex gap-2">
						<StatusButton
							className="w-30"
							type="submit"
							form={form.id}
							disabled={isPending}
							status={isPending ? 'pending' : 'idle'}
						>
							Save
						</StatusButton>
						{(form.dirty ||
							imageFieldset.file.dirty ||
							actionData?.result.status === 'success') && (
							<Button
								variant="outline"
								className="border-destructive text-destructive hover:text-destructive"
								{...form.reset.getButtonProps()}
							>
								Reset
							</Button>
						)}
					</div>
				</div>
				<ErrorList id={form.errorId} errors={form.errors} />
			</Form>
		</FormProvider>
	)
}

function ProfileImage({ previewImage }: { previewImage: string | null }) {
	const className =
		'bg-background text-muted-foreground ring-border ring-1 rounded-md'
	return (
		<div className="relative flex size-24 items-center justify-center">
			{!previewImage ? (
				<div
					className={cn(
						className,
						'flex size-full items-center justify-center',
					)}
				>
					<UserRound className="size-16" />
				</div>
			) : previewImage.startsWith('data:image/') ? (
				<img
					src={previewImage}
					alt="Profile Image"
					className={cn(className, 'size-full object-cover')}
				/>
			) : (
				<Img
					src={previewImage}
					className={cn(className, 'size-full object-cover')}
					width={96}
					height={96}
				/>
			)}
		</div>
	)
}

export { UserForm }
