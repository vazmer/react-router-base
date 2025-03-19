import {
	FormProvider,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useEffectEvent } from '@react-aria/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { Form, useRouteLoaderData } from 'react-router'
import { z } from 'zod'
import { type Info as UsernameInfo } from './+types/$username.ts'
import {
	CheckboxGroupField,
	ErrorList,
	Field,
	ImageUpload,
} from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { type loader } from '@/routes/admin+/users+/_route.tsx'
import { getUserImgSrc, useIsPending } from '@/utils/misc.tsx'
import {
	EmailSchema,
	ImageFieldsetSchema,
	NameSchema,
	RolesSchema,
	UsernameSchema,
} from '@/utils/user-validation.ts'

export const UserFormSchema = z.object({
	id: z.string().optional(),
	name: NameSchema,
	username: UsernameSchema,
	roles: RolesSchema,
	email: EmailSchema,
	image: ImageFieldsetSchema,
})

function UserForm({
	params,
	user,
	actionData,
}: {
	user?: UsernameInfo['loaderData']['user']
	actionData?: UsernameInfo['actionData']
	params: UsernameInfo['params']
} & React.ComponentProps<'div'>) {
	const isPending = useIsPending()
	const loaderData = useRouteLoaderData<typeof loader>(
		'routes/admin+/users+/_route',
	)
	const allRoles = loaderData?.roles || []

	const selectedRoles = (actionData?.user?.roles ?? user?.roles)?.map(
		(r) => r.name,
	)

	const defaultValue = {
		id: actionData?.user?.id ?? user?.id,
		name: actionData?.user?.name ?? user?.name,
		username: actionData?.user?.username ?? user?.username,
		email: actionData?.user?.email ?? user?.email,
		roles: selectedRoles,
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
			return !['image'].includes(fieldName)
		},
		shouldRevalidate: 'onInput',
	})
	const isExistingImage = Boolean(fields.id.initialValue)
	const [initialUsername, setInitialUsername] = useState(params.username)
	const initialImage = useMemo(
		() => getUserImgSrc(user?.image?.objectKey || null),
		[user?.image?.objectKey],
	)

	const resetForm = useEffectEvent(() => form.reset())
	useEffect(() => {
		if (params.username !== initialUsername) {
			resetForm()
			setInitialUsername(params.username)
		}
	}, [resetForm, params.username, initialUsername])

	return (
		<FormProvider context={form.context}>
			<Form
				method="POST"
				className="flex h-full max-w-md flex-col gap-2"
				{...getFormProps(form)}
				encType="multipart/form-data"
			>
				{/*
					This hidden submit button is here to ensure that when the user hits
					"enter" on an input field, the primary form function is submitted
					rather than the first button in the form (which is delete/add image).
				*/}
				<button type="submit" className="hidden" />
				{user ? <input type="hidden" name="id" value={user.id} /> : null}
				<div className="flex flex-col gap-6">
					<ImageUpload
						labelProps={{ children: 'Image' }}
						className="grid gap-2"
						meta={fields.image}
						isExistingImage={isExistingImage}
						initialImage={initialImage}
						onReset={() =>
							form.reset({
								name: 'image',
							})
						}
					/>
					<CheckboxGroupField
						className="grid gap-2"
						labelProps={{ children: 'Roles' }}
						meta={fields.roles}
						items={allRoles?.map((role) => ({
							name: role.name,
							value: role.name,
						}))}
						errors={fields.roles.errors}
					/>
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
					{/*<div className="flex gap-2">*/}
					<StatusButton
						className="w-30"
						type="submit"
						form={form.id}
						disabled={isPending}
						status={isPending ? 'pending' : 'idle'}
					>
						Save
					</StatusButton>
					{/*{(form.dirty ||*/}
					{/*	imageFieldset.file.dirty ||*/}
					{/*	actionData?.result.status === 'success') && (*/}
					{/*	<Button*/}
					{/*		variant="outline"*/}
					{/*		className="border-destructive text-destructive hover:text-destructive"*/}
					{/*		{...form.reset.getButtonProps()}*/}
					{/*	>*/}
					{/*		Reset*/}
					{/*	</Button>*/}
					{/*)}*/}
					{/*</div>*/}
				</div>
				<ErrorList id={form.errorId} errors={form.errors} />
			</Form>
		</FormProvider>
	)
}

export { UserForm }
