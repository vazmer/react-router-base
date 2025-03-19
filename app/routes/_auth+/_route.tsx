import React from 'react'
import { Outlet } from 'react-router'
import { type Route } from './+types/_route'
import { requireAnonymous } from '@/utils/auth.server.ts'

export const loader = async ({ request }: Route.LoaderArgs) => {
	await requireAnonymous(request)
	return {}
}

export default function App() {
	return (
		<div className="flex max-h-full min-h-svh items-center justify-center overflow-hidden bg-gradient-to-r from-blue-800 from-10% via-sky-800 via-30% to-emerald-700 to-90% p-6 max-lg:flex md:min-h-svh md:p-10">
			<Outlet />
		</div>
	)
}
