import { t } from 'i18next'
import React from 'react'
import { Outlet } from 'react-router'
import { type Route } from './+types/_layout'
import { AppSidebar } from '@/components/app-sidebar.tsx'
import { Breadcrumbs } from '@/components/breadcrumbs.tsx'
import { LanguageDropDown } from '@/components/language-dropdown.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar.tsx'
import { type BreadcrumbHandle } from '@/routes/admin+/index.tsx'
import { ThemeSwitch } from '@/routes/resources+/theme-switch.tsx'
import { requireUserWithRole } from '@/utils/permission.server.ts'
import { useRequestInfo } from '@/utils/request-info.ts'

export const loader = async ({ request }: Route.LoaderArgs) => {
	await requireUserWithRole(request, 'admin')
	return {}
}

export const handle: BreadcrumbHandle = {
	breadcrumb: () => t('breadcrumbs.Home'),
}

export default function App() {
	const { userPrefs } = useRequestInfo()
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 items-center border-b px-4">
					<div className="flex shrink-0 grow items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumbs />
					</div>
					<div className="flex shrink-0 items-center gap-2">
						<LanguageDropDown />
						<ThemeSwitch userPreference={userPrefs.theme} />
					</div>
				</header>
				<div className="p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
