import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useMatches } from 'react-router'
import { NavUser } from '@/components/nav-user.tsx'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
	navMain: [
		{
			title: 'sidebar.administration',
			items: [
				{
					title: 'sidebar.users',
					url: '/admin/users',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()
	const pathnames = useMatches().map(({ pathname }) => pathname)
	const { t } = useTranslation()

	return (
		<Sidebar {...props}>
			<SidebarContent>
				{data.navMain.map(({ title, items }) => (
					<SidebarGroup key={title}>
						<SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map(({ url, title: itemTitle }) => (
									<SidebarMenuItem key={itemTitle}>
										<SidebarMenuButton
											asChild
											isActive={pathnames.includes(location.pathname)}
										>
											<NavLink to={url}>{t(itemTitle)}</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
