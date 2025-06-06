import { ChevronsUpDown, LogOut, UserPen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Form, NavLink } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx'
import { getUserImgSrc } from '@/utils/misc.tsx'
import { useUser } from '@/utils/user.ts'

function UserDropdownItem() {
	const user = useUser()
	const [firstName, lastName] = user.name?.split(' ') || []

	return (
		<>
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage
					src={getUserImgSrc(user.image?.objectKey)}
					alt={user.name || user.username}
				/>
				<AvatarFallback className="rounded-lg">{`${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`}</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold">{user.name}</span>
				<span className="text-muted-foreground truncate text-xs">
					{user.email}
				</span>
			</div>
		</>
	)
}

export function NavUser() {
	const { t } = useTranslation()
	const user = useUser()
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<UserDropdownItem />
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side="right"
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<UserDropdownItem />
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<NavLink to={`/admin/users/${user.username}`}>
							<Button
								type="submit"
								variant="ghost"
								className="size-full justify-start p-0"
							>
								<DropdownMenuItem className="w-full">
									<UserPen />
									{t('sidebar.editProfile')}
								</DropdownMenuItem>
							</Button>
						</NavLink>
						<Form action="/logout" method="POST">
							<Button
								type="submit"
								variant="ghost"
								className="size-full justify-start p-0"
							>
								<DropdownMenuItem className="w-full">
									<LogOut />
									{t('sidebar.logout')}
								</DropdownMenuItem>
							</Button>
						</Form>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
