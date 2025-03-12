import { type BreadcrumbHandle } from '@/routes/admin+/_index.tsx'

export const handle: BreadcrumbHandle = {
	breadcrumb: ({ t }) => t('breadcrumbs.users'),
}
