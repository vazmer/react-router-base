import { type BreadcrumbHandle } from '@/routes/admin+/index.tsx'

export const handle: BreadcrumbHandle = {
	breadcrumb: ({ t }) => t('breadcrumbs.Users'),
}
