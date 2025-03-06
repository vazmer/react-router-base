import { redirect } from 'react-router'
import { type Route } from './+types/logout.ts'
import { logout } from '@/utils/auth.server.ts'

export async function loader() {
	return redirect('/')
}

export async function action({ request }: Route.ActionArgs) {
	return logout({ request })
}
