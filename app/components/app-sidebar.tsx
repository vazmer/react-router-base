import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router'
import { NavUser } from '@/components/nav-user.tsx'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
	navMain: [
		{
			title: 'sidebar.Administration',
			items: [
				{
					title: 'sidebar.Users',
					url: '/admin/users',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()
	const { t } = useTranslation()

	return (
		<Sidebar {...props}>
			<SidebarHeader></SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map(({ title, items }) => (
					<SidebarGroup key={title}>
						<SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map(({ url, title: itemTitle }) => (
									<SidebarMenuItem key={itemTitle}>
										<SidebarMenuButton
											asChild
											isActive={location.pathname === url}
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
