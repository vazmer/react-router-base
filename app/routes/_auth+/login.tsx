import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Loader2 } from 'lucide-react'
import { data, Form, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/login.ts'
import { Button } from '@/components/ui/button.tsx'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { handleNewSession } from '@/routes/_auth+/login.server.ts'
import { login, requireAnonymous } from '@/utils/auth.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server.ts'
import { useIsPending } from '@/utils/misc'
import { PasswordSchema, UsernameSchema } from '@/utils/user-validation.ts'

// export const handle: SEOHandle = {
// 	getSitemapEntries: () => null,
// }

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

export default function LoginPage({ actionData }: Route.ComponentProps) {
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
									<Button disabled={isPending} type="submit" className="w-full">
										{isPending && <Loader2 className="animate-spin" />}
										Login
									</Button>
									{form.errors?.join('-')}
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
	return [{ title: 'Login' }]
}

export function ErrorBoundary() {
	return <></>
}
