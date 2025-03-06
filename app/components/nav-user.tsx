import { ChevronsUpDown, LogOut } from 'lucide-react'
import { Form } from 'react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar.tsx'
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
import { useUser } from '@/utils/user.ts'

function UserDropdownItem() {
	const user = useUser()
	const [firstName, lastName] = user.name?.split(' ') || []

	return (
		<>
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage
					src={user.image?.objectKey}
					alt={user.name || user.username}
				/>
				<AvatarFallback className="rounded-lg">{`${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`}</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold">{user.name}</span>
				<span className="truncate text-xs">{user.username}</span>
			</div>
		</>
	)
}

export function NavUser() {
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
						<Form action="/logout" method="POST">
							<Button
								type="submit"
								variant="ghost"
								className="h-full w-full justify-start p-0"
							>
								<DropdownMenuItem className="w-full">
									<LogOut />
									Logout
								</DropdownMenuItem>
							</Button>
						</Form>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
