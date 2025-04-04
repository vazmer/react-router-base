import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { data, Form, redirect, useActionData } from 'react-router'
import { type Route } from './+types/reset-password.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, Field } from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
import {
	checkIsCommonPassword,
	requireAnonymous,
	resetUserPassword,
} from '@/utils/auth.server.ts'
import { useIsPending } from '@/utils/misc.tsx'
import { PasswordAndConfirmPasswordSchema } from '@/utils/user-validation.ts'
import { verifySessionStorage } from '@/utils/verification.server.ts'

export const resetPasswordUsernameSessionKey = 'resetPasswordUsername'

const ResetPasswordSchema = PasswordAndConfirmPasswordSchema

async function requireResetPasswordUsername(request: Request) {
	await requireAnonymous(request)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const resetPasswordUsername = verifySession.get(
		resetPasswordUsernameSessionKey,
	)

	if (typeof resetPasswordUsername !== 'string' || !resetPasswordUsername) {
		throw redirect('/login')
	}
	return resetPasswordUsername
}

export async function loader({ request }: Route.LoaderArgs) {
	const resetPasswordUsername = await requireResetPasswordUsername(request)
	return { resetPasswordUsername }
}

export async function action({ request }: Route.ActionArgs) {
	const resetPasswordUsername = await requireResetPasswordUsername(request)
	const formData = await request.formData()
	const submission = await parseWithZod(formData, {
		schema: ResetPasswordSchema.superRefine(async ({ password }, ctx) => {
			const isCommonPassword = await checkIsCommonPassword(password)
			if (isCommonPassword) {
				ctx.addIssue({
					path: ['password'],
					code: 'custom',
					message: 'Password is too common',
				})
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
	const { password } = submission.value

	await resetUserPassword({ username: resetPasswordUsername, password })
	const verifySession = await verifySessionStorage.getSession()
	return redirect('/login', {
		headers: {
			'set-cookie': await verifySessionStorage.destroySession(verifySession),
		},
	})
}

export const meta: Route.MetaFunction = () => {
	return [{ title: `Reset Password | ${ENV.APP_NAME}` }]
}

export default function ResetPasswordPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="container">
			<AuthCard
				title="Password Reset"
				description={`Hi, ${loaderData.resetPasswordUsername}. Set your new password below.`}
			>
				<ResetPasswordForm />
			</AuthCard>
		</div>
	)
}

export function ResetPasswordForm() {
	const isPending = useIsPending()
	const actionData = useActionData<Route.ComponentProps['actionData']>()

	const [form, fields] = useForm({
		id: 'reset-password',
		constraint: getZodConstraint(ResetPasswordSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ResetPasswordSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<Form method="POST" {...getFormProps(form)} className="flex flex-col gap-6">
			<Field
				labelProps={{
					htmlFor: fields.password.id,
					children: 'New Password',
				}}
				inputProps={{
					...getInputProps(fields.password, { type: 'password' }),
					autoComplete: 'new-password',
					autoFocus: true,
				}}
				errors={fields.password.errors}
			/>
			<Field
				labelProps={{
					htmlFor: fields.confirmPassword.id,
					children: 'Confirm Password',
				}}
				inputProps={{
					...getInputProps(fields.confirmPassword, { type: 'password' }),
					autoComplete: 'new-password',
				}}
				errors={fields.confirmPassword.errors}
			/>
			<ErrorList errors={form.errors} id={form.errorId} />
			<StatusButton
				className="w-full"
				status={isPending ? 'pending' : (form.status ?? 'idle')}
				type="submit"
				disabled={isPending}
			>
				Reset password
			</StatusButton>
		</Form>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
