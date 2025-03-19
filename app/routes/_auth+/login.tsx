import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import React from 'react'
import { data, Form, Link, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { ServerOnly } from 'remix-utils/server-only'
import { z } from 'zod'
import { type Route } from './+types/login.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, Field } from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { AppIntro } from '@/routes/_auth+/__app-intro.tsx'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
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

export default function LoginRoute({ actionData }: Route.ComponentProps) {
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
		<div className="container lg:grid lg:grid-cols-2">
			<AuthCard
				title="Login"
				description="Enter your email below to login to your account"
				includeAppName={false}
			>
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
								className: 'lowercase',
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
						<ErrorList errors={form.errors} />
						<StatusButton
							className="w-full"
							type="submit"
							disabled={isPending}
							status={isPending ? 'pending' : 'idle'}
						>
							Login
						</StatusButton>
					</div>
					<ServerOnly>
						{() => (
							<input
								{...getInputProps(fields.redirectTo, {
									type: 'hidden',
								})}
							/>
						)}
					</ServerOnly>
				</Form>
				<div className="self-end text-sm">
					New here?{' '}
					<Link
						className="underline underline-offset-4"
						to={
							redirectTo
								? `/signup?redirectTo=${encodeURIComponent(redirectTo)}`
								: '/signup'
						}
					>
						Create an account
					</Link>
				</div>
			</AuthCard>
			<AppIntro />
		</div>
	)
}

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Login | Rr App' },
		{ name: 'description', content: `Login into App` },
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
