import { redirect } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { resetPasswordUsernameSessionKey } from '@/routes/_auth+/reset-password.tsx'
import { sessionKey, sessionTenantIdKey } from '@/utils/auth.server'
import { prisma } from '@/utils/db.server.ts'
import { combineResponseInits } from '@/utils/misc'
import { authSessionStorage } from '@/utils/session.server'
import { verifySessionStorage } from '@/utils/verification.server.ts'

export async function handleNewSession(
	{
		request,
		session,
		redirectTo,
		remember,
	}: {
		request: Request
		session: { userId: string; id: string; expirationDate: Date }
		redirectTo?: string
		remember: boolean
	},
	responseInit?: ResponseInit,
) {
	const user = await prisma.user.findUnique({
		where: { id: session.userId },
		include: {
			password: true,
			roles: {
				where: {
					name: 'admin',
				},
			},
		},
	})

	if (user?.password?.requiredReset) {
		const verifySession = await verifySessionStorage.getSession()
		verifySession.set(resetPasswordUsernameSessionKey, user.username)
		return redirect('/reset-password-required', {
			headers: {
				'set-cookie': await verifySessionStorage.commitSession(verifySession),
			},
		})
	}

	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	authSession.set(sessionKey, session.id)
	authSession.set(sessionTenantIdKey, user?.tenantId)

	if (!redirectTo) {
		if (!!user?.roles.find((role) => role.name === 'admin')) {
			redirectTo = '/admin'
		}
	}

	return redirect(
		safeRedirect(redirectTo),
		combineResponseInits(
			{
				headers: {
					'set-cookie': await authSessionStorage.commitSession(authSession, {
						expires: remember ? session.expirationDate : undefined,
					}),
				},
			},
			responseInit,
		),
	)
}
