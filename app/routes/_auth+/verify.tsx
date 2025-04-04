import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import React from 'react'
import { Form, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { type Route } from './+types/verify'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { ErrorList, OTPField } from '@/components/forms.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
import { validateRequest } from '@/routes/_auth+/verify.server.ts'
import { checkHoneypot } from '@/utils/honeypot.server'
import { useIsPending } from '@/utils/misc.tsx'

export const codeQueryParam = 'code'
export const targetQueryParam = 'target'
export const typeQueryParam = 'type'
export const redirectToQueryParam = 'redirectTo'
const types = ['onboarding', 'reset-password', 'change-email', '2fa'] as const
const VerificationTypeSchema = z.enum(types)
export type VerificationTypes = z.infer<typeof VerificationTypeSchema>

export const VerifySchema = z.object({
	[codeQueryParam]: z.string().min(6).max(6),
	[typeQueryParam]: VerificationTypeSchema,
	[targetQueryParam]: z.string(),
	[redirectToQueryParam]: z.string().optional(),
})

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	return validateRequest(request, formData)
}

export default function VerifyRoute({ actionData }: Route.ComponentProps) {
	const [searchParams] = useSearchParams()
	const isPending = useIsPending()
	const parseWithZodType = VerificationTypeSchema.safeParse(
		searchParams.get(typeQueryParam),
	)
	const type = parseWithZodType.success ? parseWithZodType.data : null

	const checkEmail = {
		title: 'Check your email',
		description: "We've sent you a code to verify your email address.",
	}

	const headings: Record<
		VerificationTypes,
		{ title: string; description: string }
	> = {
		onboarding: checkEmail,
		'reset-password': checkEmail,
		'change-email': checkEmail,
		'2fa': {
			title: 'Check your 2FA app',
			description: 'Please enter your 2FA code to verify your identity.',
		},
	}

	const [form, fields] = useForm({
		id: 'verify-form',
		constraint: getZodConstraint(VerifySchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: VerifySchema })
		},
		defaultValue: {
			code: searchParams.get(codeQueryParam),
			type: type,
			target: searchParams.get(targetQueryParam),
			redirectTo: searchParams.get(redirectToQueryParam),
		},
	})

	return (
		<AuthCard
			title={type ? headings[type]['title'] : 'Invalid Verification Type'}
			description={type ? headings[type]['description'] : null}
		>
			<ErrorList errors={form.errors} id={form.errorId} />
			<div className="flex w-full gap-2">
				<Form
					method="POST"
					{...getFormProps(form)}
					className="flex flex-1 flex-col gap-8"
				>
					<HoneypotInputs />
					<div className="flex items-center justify-center">
						<OTPField
							labelProps={{
								htmlFor: fields[codeQueryParam].id,
								children: 'Code',
							}}
							inputProps={{
								...getInputProps(fields[codeQueryParam], { type: 'text' }),
								autoComplete: 'one-time-code',
								autoFocus: true,
							}}
							errors={fields[codeQueryParam].errors}
						/>
					</div>
					<input
						{...getInputProps(fields[typeQueryParam], { type: 'hidden' })}
					/>
					<input
						{...getInputProps(fields[targetQueryParam], { type: 'hidden' })}
					/>
					<input
						{...getInputProps(fields[redirectToQueryParam], {
							type: 'hidden',
						})}
					/>
					<StatusButton
						className="w-full"
						status={isPending ? 'pending' : (form.status ?? 'idle')}
						type="submit"
						disabled={isPending}
					>
						Submit
					</StatusButton>
				</Form>
			</div>
		</AuthCard>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
