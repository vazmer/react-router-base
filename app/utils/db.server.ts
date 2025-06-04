import { styleText } from 'node:util'
import { remember } from '@epic-web/remember'
import { Prisma, PrismaClient, type Tenant } from '@prisma/generated/client'
import { sessionTenantIdKey } from '@/utils/auth.server.ts'
import { authSessionStorage } from '@/utils/session.server.ts'

export const prisma = remember('prisma', () => {
	// NOTE: if you change anything in this function you'll need to restart
	// the dev server to see your changes.

	// Feel free to change this log threshold to something that makes sense for you
	const logThreshold = 20

	const client = new PrismaClient({
		errorFormat: 'pretty',
		log: [
			{ level: 'query', emit: 'event' },
			{ level: 'error', emit: 'stdout' },
			{ level: 'warn', emit: 'stdout' },
		],
	})
	client.$on('query', async (e) => {
		if (e.duration < logThreshold) return
		const color =
			e.duration < logThreshold * 1.1
				? 'green'
				: e.duration < logThreshold * 1.2
					? 'blue'
					: e.duration < logThreshold * 1.3
						? 'yellow'
						: e.duration < logThreshold * 1.4
							? 'redBright'
							: 'red'
		const dur = styleText(color, `${e.duration}ms`)
		console.info(`prisma:query - ${dur} - ${e.query}`)
	})
	void client.$connect()
	return client.$extends(bypassRLS())
})

export async function tenantPrisma(request: Request) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const tenantId = authSession.get(sessionTenantIdKey)
	const client = remember(`prisma_${tenantId}`, () =>
		prisma.$extends(forTenant(tenantId)),
	)
	return client
}

export function bypassRLS() {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		}),
	)
}

export function forTenant(tenantId: Tenant['id']) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_tenant_id', ${tenantId}, TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		}),
	)
}
