import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import React from 'react'
import { data, Form, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/login.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, Field } from '@/components/forms.tsx'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { handleNewSession } from '@/routes/_auth+/login.server.ts'
import { login, requireAnonymous } from '@/utils/auth.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server.ts'
import { useIsPending } from '@/utils/misc'
import { PasswordSchema, UsernameSchema } from '@/utils/user-validation.ts'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

const LoginFormSchema = z.object({
	username: UsernameSchema,
	password: PasswordSchema,
	redirectTo: z.string().optional(),
	remember: z.boolean().optional(),
})

// const AuthenticationOptionsSchema = z.object({
// 	options: z.object({ challenge: z.string() }),
// }) satisfies z.ZodType<{ options: PublicKeyCredentialRequestOptionsJSON }>

export async function loader({ request }: Route.LoaderArgs) {
	await requireAnonymous(request)
	return {}
}

export async function action({ request }: Route.ActionArgs) {
	await requireAnonymous(request)
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: (intent) =>
			LoginFormSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null }

				const session = await login(data)
				if (!session) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Invalid username or password',
					})
					return z.NEVER
				}

				return { ...data, session }
			}),
		async: true,
	})

	if (submission.status !== 'success' || !submission.value.session) {
		return data(
			{ result: submission.reply({ hideFields: ['password'] }) },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { session, remember, redirectTo } = submission.value

	return handleNewSession({
		request,
		session,
		remember: remember ?? false,
		redirectTo,
	})
}

export default function Login({ actionData }: Route.ComponentProps) {
	const isPending = useIsPending()
	const [searchParams] = useSearchParams()
	const redirectTo = searchParams.get('redirectTo')

	const [form, fields] = useForm({
		id: 'login-form',
		constraint: getZodConstraint(LoginFormSchema),
		defaultValue: { redirectTo },
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: LoginFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form method="POST" {...getFormProps(form)}>
								<HoneypotInputs />
								<div className="flex flex-col gap-6">
									<Field
										className="grid gap-2"
										labelProps={{ children: 'Username' }}
										inputProps={{
											...getInputProps(fields.username, { type: 'text' }),
											placeholder: 'm@example.com',
											autoComplete: 'username',
											autoFocus: true,
										}}
										errors={fields.username.errors}
									/>
									<Field
										className="grid gap-2"
										labelProps={{ children: 'Password' }}
										inputProps={{
											...getInputProps(fields.password, { type: 'password' }),
											autoComplete: 'current-password',
										}}
										errors={fields.password.errors}
									/>
									<ErrorList errors={fields.password.errors} />
									<StatusButton
										className="w-full"
										type="submit"
										disabled={isPending}
										status={isPending ? 'pending' : 'idle'}
									>
										Login
									</StatusButton>
									<ErrorList errors={form.errors} />
								</div>
								<input
									{...getInputProps(fields.redirectTo, { type: 'hidden' })}
								/>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

// const VerificationResponseSchema = z.discriminatedUnion('status', [
// 	z.object({
// 		status: z.literal('success'),
// 		location: z.string(),
// 	}),
// 	z.object({
// 		status: z.literal('error'),
// 		error: z.string(),
// 	}),
// ])

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Login | App' },
		{ name: 'description', content: `Lobin into App` },
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
