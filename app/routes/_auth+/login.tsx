import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import React from 'react'
import { data, Form, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { ServerOnly } from 'remix-utils/server-only'
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
import { Separator } from '@/components/ui/separator.tsx'
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
		<div className="min-h-svh gap-0 overflow-hidden bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90% p-6 max-lg:flex md:min-h-svh md:p-10 lg:grid lg:grid-cols-2">
			<div className="flex h-full w-full items-center justify-center self-center">
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
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<AppIntro />
		</div>
	)
}

function AppIntro() {
	return (
		<div className="bg-accent-foreground m-2 flex rounded-4xl p-[10%] ring-10 ring-white/20 max-lg:hidden lg:mt-[10%] lg:mr-[30%] lg:mb-[-5%]">
			<div className="text-muted flex flex-col gap-10">
				<h1 className="text-primary-foreground scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Rr App
				</h1>
				<p>
					An advanced React router app built on top of the Epic Web stack
					following latest technologies and trends.
				</p>
				<ul className="flex flex-col gap-3 max-md:hidden">
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-sky-500 dark:text-white">
								@Tailwind
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Built with accessibility in mind with the help of{' '}
							<code className="font-mono font-medium text-amber-300 dark:text-white">
								@RadixUI
							</code>{' '}
							and{' '}
							<code className="font-mono font-medium text-amber-300 dark:text-white">
								@ShadCN
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Deployed automatically at{' '}
							<code className="font-mono font-medium text-fuchsia-600 dark:text-white">
								@fly
							</code>{' '}
							triggered by{' '}
							<code className="font-mono font-medium text-amber-300 dark:text-white">
								@Github
							</code>{' '}
							actions
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-amber-300 dark:text-white">
								@i18n
							</code>{' '}
							implemented from the start currently supporting Serbian and
							English. Any language can be quickly added.
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-emerald-500 dark:text-white">
								@Prisma
							</code>{' '}
							and{' '}
							<code className="font-mono font-medium text-blue-500 dark:text-white">
								@PostgreSQL
							</code>{' '}
							for saving data and ORM
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Files storage at{' '}
							<code className="font-mono font-medium text-green-500 dark:text-white">
								@Tigris
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Light and dark mode with an automatic detecton of user's system
							preference
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">... and many more.</p>
					</li>
				</ul>
				<p className="max-md:hidden">
					Perfect for learning how the framework works, or starting a new
					project in no-time.
				</p>
				<Separator className="opacity-15" />
				<p className="text-muted-foreground">
					Check the Github{' '}
					<a
						className="font-medium text-blue-500 hover:underline"
						href="https://github.com/vazmer/react-router-base/"
						target="_blank"
						rel="noopener noreferrer"
					>
						repository
					</a>{' '}
					for more details.
				</p>
			</div>
		</div>
	)
}

function CheckItem() {
	return (
		<svg
			className="h-[1lh] w-5.5 shrink-0"
			viewBox="0 0 22 22"
			fill="none"
			stroke-linecap="square"
		>
			<circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
			<circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
			<path
				d="M8 11.5L10.5 14L14 8"
				className="stroke-sky-800 dark:stroke-sky-300"
			/>
		</svg>
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
		{ title: 'Login | Rr App' },
		{ name: 'description', content: `Lobin into App` },
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
