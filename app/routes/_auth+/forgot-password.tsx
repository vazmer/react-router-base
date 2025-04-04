import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as E from '@react-email/components'
import React from 'react'
import { data, redirect, Link, useFetcher } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/forgot-password.ts'
import { prepareVerification } from './verify.server.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, Field } from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
import { prisma } from '@/utils/db.server.ts'
import { sendEmail } from '@/utils/email.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server.ts'
import { EmailSchema, UsernameSchema } from '@/utils/user-validation.ts'

const ForgotPasswordSchema = z.object({
	usernameOrEmail: z.union([EmailSchema, UsernameSchema]),
})

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: ForgotPasswordSchema.superRefine(async (data, ctx) => {
			const user = await prisma.user.findFirst({
				where: {
					OR: [
						{ email: data.usernameOrEmail },
						{ username: data.usernameOrEmail },
					],
				},
				select: { id: true },
			})
			if (!user) {
				ctx.addIssue({
					path: ['usernameOrEmail'],
					code: z.ZodIssueCode.custom,
					message: 'No user exists with this username or email',
				})
				return
			}
		}),
		async: true,
	})
	if (submission.status !== 'success') {
		return data(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}
	const { usernameOrEmail } = submission.value

	const user = await prisma.user.findFirstOrThrow({
		where: { OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }] },
		select: { email: true, username: true },
	})

	const { verifyUrl, redirectTo, otp } = await prepareVerification({
		period: 10 * 60,
		request,
		type: 'reset-password',
		target: usernameOrEmail,
	})

	const response = await sendEmail({
		to: user.email,
		subject: `${ENV.APP_NAME} Password Reset`,
		react: (
			<ForgotPasswordEmail onboardingUrl={verifyUrl.toString()} otp={otp} />
		),
	})

	if (response.status === 'success') {
		return redirect(redirectTo.toString())
	} else {
		return data(
			{ result: submission.reply({ formErrors: [response.error.message] }) },
			{ status: 500 },
		)
	}
}

function ForgotPasswordEmail({
	onboardingUrl,
	otp,
}: {
	onboardingUrl: string
	otp: string
}) {
	return (
		<E.Html lang="en" dir="ltr">
			<E.Container>
				<h1>
					<E.Text>{ENV.APP_NAME} Password Reset</E.Text>
				</h1>
				<p>
					<E.Text>
						Here's your verification code: <strong>{otp}</strong>
					</E.Text>
				</p>
				<p>
					<E.Text>Or click the link:</E.Text>
				</p>
				<E.Link href={onboardingUrl}>{onboardingUrl}</E.Link>
			</E.Container>
		</E.Html>
	)
}

export const meta: Route.MetaFunction = () => {
	return [{ title: `Password Recovery | ${ENV.APP_NAME}` }]
}

export default function ForgotPasswordRoute() {
	const forgotPassword = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'forgot-password-form',
		constraint: getZodConstraint(ForgotPasswordSchema),
		lastResult: forgotPassword.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ForgotPasswordSchema })
		},
		shouldRevalidate: 'onInput',
	})

	return (
		<div className="container">
			<AuthCard
				title="Forgot Password"
				description="No worries, we'll send you reset instructions."
				includeAppName={false}
			>
				<forgotPassword.Form
					method="POST"
					{...getFormProps(form)}
					className="flex flex-col gap-6"
				>
					<HoneypotInputs />
					<div>
						<Field
							labelProps={{
								htmlFor: fields.usernameOrEmail.id,
								children: 'Username or Email',
							}}
							inputProps={{
								autoFocus: true,
								...getInputProps(fields.usernameOrEmail, { type: 'text' }),
							}}
							errors={fields.usernameOrEmail.errors}
						/>
					</div>
					<ErrorList errors={form.errors} id={form.errorId} />

					<StatusButton
						className="w-full"
						type="submit"
						disabled={forgotPassword.state !== 'idle'}
						status={
							forgotPassword.state === 'submitting'
								? 'pending'
								: (form.status ?? 'idle')
						}
					>
						Recover password
					</StatusButton>
				</forgotPassword.Form>
				<Link
					to="/login"
					className="self-end text-sm underline underline-offset-4"
				>
					Back to Login
				</Link>
			</AuthCard>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
