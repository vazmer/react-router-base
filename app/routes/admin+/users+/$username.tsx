import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { createPassword } from '@tests/db.utils.ts'
import { Loader2 } from 'lucide-react'
import React from 'react'
import {
	data,
	Form,
	type LoaderFunctionArgs,
	useLoaderData,
} from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/$username'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { prisma } from '@/utils/db.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server.ts'
import { useIsPending } from '@/utils/misc.tsx'
import { createToastHeaders } from '@/utils/toast.server.ts'
import { PasswordSchema, UsernameSchema } from '@/utils/user-validation.ts'

const UserFormSchema = z.object({
	username: UsernameSchema,
	password: PasswordSchema,
})

export const handle = {
	breadcrumb: ({
		match,
	}: {
		match: { data: Route.ComponentProps['loaderData'] }
	}) => match.data.user.name,
}

export async function loader({ params }: LoaderFunctionArgs) {
	const user = await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			username: true,
			createdAt: true,
			image: { select: { id: true, objectKey: true } },
		},
		where: {
			username: params.username,
		},
	})

	invariantResponse(user, 'User not found', { status: 404 })

	return { user, userJoinedDisplay: user.createdAt.toLocaleDateString() }
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = parseWithZod(formData, { schema: UserFormSchema })

	if (submission.status !== 'success' || !submission.value) {
		return data(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { username, password } = submission.value
	await prisma.user.update({
		select: { username: true },
		where: { username: username },
		data: { password: { update: createPassword(password) } },
	})

	return data(
		{
			result: submission.reply(),
		},

		{
			headers: await createToastHeaders({
				description: 'User updated',
				type: 'success',
			}),
		},
	)
}

export default function User({ actionData }: Route.ComponentProps) {
	const isPending = useIsPending()
	const data = useLoaderData<typeof loader>()

	const [form, fields] = useForm({
		id: 'login-form',
		constraint: getZodConstraint(UserFormSchema),
		defaultValue: {},
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="text-lg font-medium">{data.user.name}</h3>
				<p className="text-muted-foreground text-sm">
					This information will be displayed publicly so be careful what you
					share.
				</p>
			</div>
			<Separator />
			<Form method="POST" {...getFormProps(form)}>
				<HoneypotInputs />
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							placeholder="m@example.com"
							autoFocus
							autoComplete="username"
							{...getInputProps(fields.username, { type: 'text' })}
						/>
						{fields.username.errors?.join('-')}
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							{fields.password.errors?.join('-')}
						</div>
						<Input
							{...getInputProps(fields.password, { type: 'password' })}
							autoComplete="current-password"
						/>
					</div>
					<Button disabled={isPending} type="submit">
						{isPending && <Loader2 className="animate-spin" />}
						Save
					</Button>
					{form.errors?.join('-')}
				</div>
			</Form>
		</div>
	)
}
