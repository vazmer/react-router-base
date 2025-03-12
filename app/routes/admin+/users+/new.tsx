import { UserForm } from './__user-form.tsx'
import { type BreadcrumbHandle } from '@/routes/admin+/_index.tsx'

export async function loader() {
	return {}
}

export { action } from './__user-form.server.tsx'

export const handle: BreadcrumbHandle = {
	breadcrumb: ({ t }) => t('breadcrumbs.newUser'),
}

export default UserForm
