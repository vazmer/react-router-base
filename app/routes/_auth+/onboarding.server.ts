import { invariant } from '@epic-web/invariant'
import { redirect } from 'react-router'
import { type VerifyFunctionArgs } from './verify.server.ts'
import { onboardingEmailSessionKey } from '@/routes/_auth+/onboarding.tsx'
import { verifySessionStorage } from '@/utils/verification.server.ts'

export async function handleVerification({ submission }: VerifyFunctionArgs) {
	invariant(
		submission.status === 'success',
		'Submission should be successful by now',
	)
	const verifySession = await verifySessionStorage.getSession()
	verifySession.set(onboardingEmailSessionKey, submission.value.target)
	return redirect('/onboarding', {
		headers: {
			'set-cookie': await verifySessionStorage.commitSession(verifySession),
		},
	})
}
