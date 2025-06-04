import { type Route } from '../../../../.react-router/types/app/routes/admin+/users+/+types/$username.ts'
import { UserForm } from './__user-form.tsx'
import { type BreadcrumbHandle } from '@/routes/admin+/_index.tsx'

export async function loader() {
	return {}
}

export { action } from './__user-form.server.tsx'

export const handle: BreadcrumbHandle = {
	breadcrumb: ({ t }) => t('breadcrumbs.newUser'),
}

export const meta: Route.MetaFunction = () => {
	return [{ title: `Create user | ${ENV.APP_NAME} Administration` }]
}
export default UserForm
