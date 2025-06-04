import { type BreadcrumbHandle } from '@/routes/admin+/_index.tsx'
import { prisma } from '@/utils/db.server.ts'

export async function loader() {
	const roles = await prisma.role.findMany({ select: { name: true } })
	return { roles }
}

export const handle: BreadcrumbHandle = {
	breadcrumb: ({ t }) => t('breadcrumbs.users'),
}
