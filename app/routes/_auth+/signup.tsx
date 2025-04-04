import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as E from '@react-email/components'
import React from 'react'
import { data, Form, Link, redirect } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/login.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, Field } from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
import { prepareVerification } from '@/routes/_auth+/verify.server.ts'
import { requireAnonymous } from '@/utils/auth.server.ts'
import { prisma } from '@/utils/db.server.ts'
import { sendEmail } from '@/utils/email.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server.ts'
import { useIsPending } from '@/utils/misc'
import { EmailSchema } from '@/utils/user-validation.ts'

const SignupSchema = z.object({
	email: EmailSchema,
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
		schema: SignupSchema.superRefine(async (data, ctx) => {
			const existingUser = await prisma.user.findUnique({
				where: { email: data.email },
				select: { id: true },
			})
			if (existingUser) {
				ctx.addIssue({
					path: ['email'],
					code: z.ZodIssueCode.custom,
					message: 'A user already exists with this email',
				})
				return
			}
		}),
		async: true,
	})

	if (submission.status !== 'success' || !submission.value.email) {
		return data(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { email } = submission.value

	const { verifyUrl, redirectTo, otp } = await prepareVerification({
		period: 10 * 60,
		request,
		type: 'onboarding',
		target: email,
	})

	const response = await sendEmail({
		to: email,
		subject: `Welcome to ${ENV.APP_NAME}!`,
		react: <SignupEmail onboardingUrl={verifyUrl.toString()} otp={otp} />,
	})

	if (response.status === 'success') {
		return redirect(redirectTo.toString())
	} else {
		return data(
			{
				result: submission.reply({ formErrors: [response.error.message] }),
			},
			{
				status: 500,
			},
		)
	}
}

export function SignupEmail({
	onboardingUrl,
	otp,
}: {
	onboardingUrl: string
	otp: string
}) {
	return (
		<E.Html lang="en" dir="ltr">
			<E.Container align="left">
				<h1>
					<E.Text>Welcome to {ENV.APP_NAME}!</E.Text>
				</h1>
				<p>
					<E.Text>
						Here's your verification code: <strong>{otp}</strong>
					</E.Text>
				</p>
				<p>
					<E.Text>Or click the link to get started:</E.Text>
				</p>
				<E.Link href={onboardingUrl}>{onboardingUrl}</E.Link>
			</E.Container>
		</E.Html>
	)
}

export default function SignupRoute({ actionData }: Route.ComponentProps) {
	const isPending = useIsPending()

	const [form, fields] = useForm({
		id: 'signup-form',
		constraint: getZodConstraint(SignupSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SignupSchema })
		},
		shouldRevalidate: 'onInput',
	})

	return (
		<AuthCard
			title="Let's start your journey!"
			description="Please enter your email address"
		>
			<Form
				method="POST"
				{...getFormProps(form)}
				className="flex flex-col gap-6"
			>
				<HoneypotInputs />
				<Field
					className="grid gap-2"
					labelProps={{ children: 'Email' }}
					inputProps={{
						...getInputProps(fields.email, { type: 'email' }),
						placeholder: 'm@example.com',
						autoComplete: 'email',
						autoFocus: true,
					}}
					errors={fields.email.errors}
				/>
				<ErrorList errors={form.errors} />
				<StatusButton
					className="w-full"
					type="submit"
					disabled={isPending}
					status={isPending ? 'pending' : (form.status ?? 'idle')}
				>
					Submit
				</StatusButton>
				<div className="self-end text-sm">
					Already have account?{' '}
					<Link to="/login" className="underline underline-offset-4">
						Login here
					</Link>
				</div>
			</Form>
		</AuthCard>
	)
}

export const meta: Route.MetaFunction = () => {
	return [{ title: `Signup | ${ENV.APP_NAME}` }]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
