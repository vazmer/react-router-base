import {
	FormProvider,
	getFieldsetProps,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Upload, User } from 'lucide-react'
import { Img } from 'openimg/react'
import React, { useState } from 'react'
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
	RolesSchema,
	UsernameSchema,
} from '@/utils/user-validation.ts'

export const MAX_UPLOAD_SIZE = 1016 * 1016 * 3 // 3MB

const ImageSchema = z.object({
	id: z.string().optional(),
	file: z
		.instanceof(File)
		.optional()
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE
		}, 'File size must be less than 3MB'),
})

export type ImageFieldset = z.infer<typeof ImageSchema>

export const UserFormSchema = z.object({
	id: z.string().optional(),
	name: NameSchema,
	username: UsernameSchema,
	roles: RolesSchema.default(['user']),
	email: EmailSchema,
	image: ImageSchema,
})

export function UserForm({
	user,
	actionData,
}: {
	user?: Info['loaderData']['user']
	actionData?: Info['actionData']
} & React.ComponentProps<'div'>) {
	const isPending = useIsPending()

	const [form, fields] = useForm({
		id: 'user-form',
		constraint: getZodConstraint(UserFormSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserFormSchema })
		},
		defaultValue: {
			...user,
			image: user?.image ?? {},
		},
		shouldRevalidate: 'onBlur',
	})
	const isExistingImage = Boolean(fields.id.initialValue)
	const [previewImage, setPreviewImage] = useState<string | null>(
		user?.image?.objectKey ? getUserImgSrc(user.image.objectKey) : null,
	)
	const imageFieldset = fields.image.getFieldset()

	return (
		<div>
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
						<Field
							className="grid gap-2"
							labelProps={{ children: 'Name' }}
							inputProps={{
								...getInputProps(fields.name, { type: 'text' }),
							}}
							errors={fields.name.errors}
						/>
						<Field
							className="grid gap-2"
							labelProps={{ children: 'Email' }}
							inputProps={{
								autoFocus: true,
								...getInputProps(fields.email, { type: 'text' }),
							}}
							errors={fields.email.errors}
						/>
						<Field
							className="grid gap-2"
							labelProps={{ children: 'Username' }}
							inputProps={{
								...getInputProps(fields.username, { type: 'text' }),
							}}
							errors={fields.username.errors}
						/>
						<div className="grid gap-2">
							<Label>Image</Label>
							<div className="border-muted-foreground relative">
								<fieldset
									{...getFieldsetProps(fields.image)}
									key={fields.image.id}
								>
									<div className="flex gap-3">
										<div className={cn('flex gap-4')}>
											<div
												className={cn({
													'bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100':
														!previewImage,
													'focus-within:ring-1': !isExistingImage,
												})}
											>
												<ProfileImage
													isExistingImage={isExistingImage}
													previewImage={previewImage}
												/>
											</div>

											{isExistingImage ? (
												<input
													{...getInputProps(imageFieldset.id, {
														type: 'hidden',
													})}
												/>
											) : null}

											<div className="flex flex-col justify-center gap-1 text-sm">
												<div className="flex gap-2">
													<div className="relative">
														<Button
															type="button"
															variant="outline"
															size="sm"
															asChild
														>
															<label htmlFor={imageFieldset.file.id}>
																<Upload />
																Select image
															</label>
														</Button>
														<input
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
																}
															}}
															accept="image/*"
															{...getInputProps(imageFieldset.file, {
																type: 'file',
															})}
														/>
													</div>
													{/*{previewImage && (*/}
													{/*	<Button*/}
													{/*		type="button"*/}
													{/*		size="sm"*/}
													{/*		variant="outline"*/}
													{/*		onClick={() => setPreviewImage(null)}*/}
													{/*	>*/}
													{/*		Remove*/}
													{/*	</Button>*/}
													{/*)}*/}
												</div>
												<div className="text-muted-foreground">
													File size can not exceed 3MB.
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
						<div className="flex gap-2">
							<StatusButton
								className="w-auto"
								type="submit"
								form={form.id}
								disabled={isPending}
								status={isPending ? 'pending' : 'idle'}
							>
								Save
							</StatusButton>
							<Button
								variant="outline"
								className="border-destructive text-destructive hover:text-destructive"
								{...form.reset.getButtonProps()}
							>
								Reset
							</Button>
						</div>
					</div>
					<ErrorList id={form.errorId} errors={form.errors} />
				</Form>
			</FormProvider>
		</div>
	)
}

function ProfileImage({
	isExistingImage,
	previewImage,
}: {
	isExistingImage: boolean
	previewImage: string | null
}) {
	return (
		<div className="relative">
			{!previewImage ? (
				<User className="ring-muted-foreground size-16 rounded-lg ring-1" />
			) : !previewImage.startsWith('data:image/') ? (
				<Img
					src={previewImage}
					className="size-16 rounded-lg object-cover"
					width={96}
					height={96}
				/>
			) : (
				<img
					src={previewImage}
					alt={''}
					className="size-16 rounded-lg object-cover"
				/>
			)}
			{isExistingImage ? null : (
				<div className="bg-secondary text-secondary-foreground pointer-events-none absolute -top-0.5 -right-0.5 rotate-12 rounded-sm px-2 py-1 text-xs shadow-md">
					new
				</div>
			)}
		</div>
	)
}
