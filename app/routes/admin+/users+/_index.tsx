import {
	getFormProps,
	getInputProps,
	getSelectProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { type Prisma } from '@prisma/client'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { type Duration, formatDistanceToNow, intlFormat, sub } from 'date-fns'
import { type IntlFormatFormatOptions } from 'date-fns/intlFormat'
import {
	ArrowDown,
	ArrowUp,
	LogOut,
	MoreHorizontal,
	Plus,
	SearchIcon,
	Trash,
	UserPen,
} from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	data,
	Form,
	Link,
	useFetcher,
	useLoaderData,
	useSubmit,
} from 'react-router'
import { z } from 'zod'
import { type Route } from './+types/_index'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { PaginationBar } from '@/components/pagination-bar.tsx'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { MultiSelect } from '@/components/ui/multi-select.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { cn } from '@/lib/utils.ts'
import { prisma } from '@/utils/db.server.ts'
import { getDateFnsLocale } from '@/utils/i18next.server.ts'
import { getInitials, getUserImgSrc, useDebounce } from '@/utils/misc.tsx'
import { requireUserWithPermission } from '@/utils/permission.server.ts'
import { redirectWithToast } from '@/utils/toast.server.ts'

const PaginationSchema = z.object({
	skip: z.number().default(0),
	take: z.number().default(15),
})

const FilterSchema = z.object({
	search: z.string().optional(),
	roles: z
		.array(z.enum(['admin', 'user']))
		.optional()
		.transform((roles) => (roles?.length === 2 ? [] : roles))
		.default([]),
	dateFrom: z
		.enum([
			'anytime',
			'lastDay',
			'last7Days',
			'last30Days',
			'lastQuarter',
			'lastYear',
		])
		.default('anytime'),
})

const SortSchema = z.object({
	sortBy: z
		.enum([
			'name',
			'email',
			'username',
			'date',
			'updatedAt',
			'createdAt',
			'session',
		])
		.default('date'),
	order: z.enum(['asc', 'desc']).default('asc'),
})

const UsersSchema = PaginationSchema.merge(FilterSchema).merge(SortSchema)

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)
	const submission = parseWithZod(url.searchParams, {
		schema: UsersSchema,
	})

	if (submission.status !== 'success') {
		throw new Error(
			'This will never fail if all fields are optional or defaulted.',
			{
				cause: submission.error,
			},
		)
	}

	const {
		search: searchTerm,
		roles: selectedRoles,
		order,
		dateFrom,
		sortBy,
		take,
		skip,
	} = submission.value

	let dateWhereInput: Prisma.UserWhereInput = {}
	if (!!dateFrom && dateFrom !== 'anytime') {
		let dateFromSub: Duration = {}
		switch (dateFrom) {
			case 'lastDay':
				dateFromSub = { days: 1 }
				break
			case 'last7Days':
				dateFromSub = { days: 7 }
				break
			case 'last30Days':
				dateFromSub = { months: 1 }
				break
			case 'lastQuarter':
				dateFromSub = { months: 3 }
				break
			case 'lastYear':
				dateFromSub = { years: 1 }
				break
			default:
				break
		}
		dateWhereInput = {
			updatedAt: {
				gte: sub(new Date(), dateFromSub),
			},
		}
	}

	const whereInput: Prisma.UserWhereInput = {
		AND: [
			dateWhereInput,
			{
				roles: selectedRoles.length
					? {
							some: {
								OR: [
									...selectedRoles.map((roleName) => ({
										name: roleName,
									})),
								],
							},
						}
					: {},
			},
			{
				OR: [
					...['name', 'username', 'email'].map((fieldName) => ({
						[fieldName]: {
							contains: searchTerm ?? '',
							mode: 'insensitive',
						},
					})),
				],
			},
		],
	}

	const orderBy: Prisma.UserOrderByWithRelationInput[] = [{ updatedAt: order }]
	switch (sortBy) {
		case 'createdAt':
		case 'name':
		case 'email':
		case 'username':
			orderBy.unshift({ [sortBy]: order })
			break
		default:
			break
	}

	const [roles, users, totalUsers] = await prisma.$transaction([
		prisma.role.findMany(),
		prisma.user.findMany({
			include: {
				sessions: {
					where: {
						expirationDate: { gt: new Date() },
					},
				},
				roles: { orderBy: { id: 'asc' } },
				image: { select: { objectKey: true } },
			},
			where: whereInput,
			take,
			skip,
			orderBy,
		}),
		prisma.user.count({
			where: whereInput,
		}),
	])

	const localeDateFnsNs = await getDateFnsLocale(request)

	const dateFormat: IntlFormatFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}

	return data({
		result: submission.reply(),
		formData: submission.value,
		status: 'idle',
		roles,
		users: users.map((user) => ({
			...user,
			date: {
				distanceToNow: formatDistanceToNow(user.createdAt, {
					locale: localeDateFnsNs,
					addSuffix: true,
				}),
				formatted: intlFormat(user.createdAt, dateFormat, {
					locale: localeDateFnsNs.code,
				}),
			},
			updatedAt: {
				distanceToNow: formatDistanceToNow(user.updatedAt, {
					locale: localeDateFnsNs,
					addSuffix: true,
				}),
				formatted: intlFormat(user.updatedAt, dateFormat, {
					locale: localeDateFnsNs.code,
				}),
			},
		})),
		totalUsers,
	})
}

const signOutOfSessionsActionIntent = 'sign-out-of-sessions'
const deleteDataActionIntent = 'delete-user'

export async function action({ request }: Route.ActionArgs) {
	await requireUserWithPermission(request, 'delete:user')
	const formData = await request.formData()
	const intent = formData.get('intent')
	const userId = formData.get('userId')
	invariantResponse(typeof userId === 'string', 'userId must be a string')

	switch (intent) {
		case signOutOfSessionsActionIntent: {
			return signOutOfSessionsAction({ userId, request })
		}
		case deleteDataActionIntent: {
			return deleteUserAction({ userId, request })
		}
		default: {
			throw new Response(`Invalid intent "${intent}"`, { status: 400 })
		}
	}
}

async function signOutOfSessionsAction({
	request,
	userId,
}: {
	request: Request
	userId: string
}) {
	await prisma.session.deleteMany({
		where: {
			userId,
		},
	})
	return redirectWithToast(request.url, {
		type: 'success',
		title: 'All sessions logged out',
		description: 'The user has been successfully logged out from all sessions.',
	})
}

async function deleteUserAction({
	userId,
	request,
}: {
	request: Request
	userId: string
}) {
	await prisma.user.delete({ where: { id: userId } })
	return redirectWithToast(request.url, {
		type: 'success',
		title: 'User Deleted',
		description: 'The user has been successfully deleted from the system.',
	})
}

export default function UsersRoute() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 justify-between space-x-2">
					<UserFiltersForm />
					<Link
						to="/admin/users/new"
						className={cn(buttonVariants(), 'h-8 self-start')}
						prefetch="intent"
					>
						<Plus />
						Add new
					</Link>
				</div>
			</div>
			<UsersTable />
		</div>
	)
}

function UserFiltersForm() {
	const { roles, formData } = useLoaderData<typeof loader>()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)

	const [form, fields] = useForm({
		id: 'users-table-form',
		constraint: getZodConstraint(UsersSchema),
		defaultValue: {
			...formData,
		},
	})

	const handleFormChange = useDebounce(async () => {
		await submit(formRef.current)
	}, 400)

	const { t } = useTranslation()

	const nextOrder = fields.order.value === 'desc' ? 'asc' : 'desc'

	const [order, setOrder] = useState(formData.order)
	const selectedRolesMemoized = useMemo(() => {
		return formData.roles && typeof formData.roles === 'string'
			? [formData.roles]
			: formData.roles || []
	}, [formData.roles])

	return (
		<Form
			ref={formRef}
			method="GET"
			autoFocus
			className="flex grow flex-wrap gap-2"
			{...getFormProps(form)}
			onChange={() => handleFormChange()}
		>
			<div className="relative flex grow flex-wrap justify-center gap-2">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
					<SearchIcon className="size-3 text-gray-500 dark:text-gray-400" />
				</div>
				<Label htmlFor={fields.search.id} className="sr-only">
					{t('search')}
				</Label>
				<Input
					placeholder={t('Search...')}
					className="size-8 w-full pl-6 text-sm"
					autoFocus
					{...getInputProps(fields.search, { type: 'search' })}
				/>
			</div>
			<Select
				{...getSelectProps(fields.dateFrom)}
				defaultValue={fields.dateFrom.initialValue}
			>
				<SelectTrigger size="sm">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="anytime">{t('users.anytime')}</SelectItem>
					<SelectItem value="lastDay">{t('users.lastDay')}</SelectItem>
					<SelectItem value="last7Days">{t('users.last7Days')}</SelectItem>
					<SelectItem value="last30Days">{t('users.last30Days')}</SelectItem>
					<SelectItem value="lastQuarter">{t('users.lastQuarter')}</SelectItem>
					<SelectItem value="lastYear">{t('users.lastYear')}</SelectItem>
				</SelectContent>
			</Select>
			<MultiSelect
				name="roles"
				className="h-8"
				// label={`${t('users.roles')}:`}
				variant="secondary"
				options={roles.map((role) => ({
					value: role.name,
					label: role.name,
				}))}
				onValueChange={handleFormChange}
				defaultValue={selectedRolesMemoized}
				placeholder={t('users.allRoles')}
				maxCount={3}
			/>
			<div className="flex gap-1">
				<Select
					{...getSelectProps(fields.sortBy)}
					defaultValue={fields.sortBy.initialValue}
				>
					<SelectTrigger className="max-w-[250px]" size="sm">
						<span className="text-muted-foreground">{t('users.sortBy')}:</span>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">{t('users.sortBy.name')}</SelectItem>
						<SelectItem value="email">{t('users.sortBy.email')}</SelectItem>
						<SelectItem value="session">
							{t('users.sortBy.sessionCount')}
						</SelectItem>
						<SelectItem value="date">{t('users.sortBy.createdAt')}</SelectItem>
						<SelectItem value="updatedAt">
							{t('users.sortBy.updatedAt')}
						</SelectItem>
					</SelectContent>
				</Select>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							type="button"
							name="order"
							value={nextOrder}
							size="icon"
							className="h-8"
							onClick={() => {
								setOrder(nextOrder)
								handleFormChange()
							}}
						>
							<input type="hidden" value={order} name="order" />
							<AccessibleIcon label="Sort order">
								{fields.order.value === 'desc' ? <ArrowDown /> : <ArrowUp />}
							</AccessibleIcon>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						Sort order:{' '}
						{fields.order.value === 'desc' ? 'Descending' : 'Ascending'}
					</TooltipContent>
				</Tooltip>
			</div>

			{/*{loaderData.status === 'idle' && (*/}
			{/*	<StatusButton*/}
			{/*		type="submit"*/}
			{/*		variant="ghost"*/}
			{/*		status={isSubmitting ? 'pending' : loaderData.status}*/}
			{/*		className="flex items-center justify-center"*/}
			{/*	/>*/}
			{/*)}*/}
		</Form>
	)
}

type UserRow = ReturnType<typeof useLoaderData<typeof loader>>['users'][0]

function UsersTable() {
	const { totalUsers, users, formData } = useLoaderData<typeof loader>()
	const { take, skip } = formData
	const { t } = useTranslation()
	const [activeDialog, setActiveDialog] = useState<
		{ user: UserRow; name: 'delete' | 'signOutSessions' } | undefined
	>(undefined)

	return (
		totalUsers > 0 && (
			<>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t('users.name')}</TableHead>
							<TableHead className="max-w-[200px] max-sm:w-auto">
								{t('users.roles')}
							</TableHead>
							<TableHead className="max-w-[50px] text-center max-sm:w-auto">
								{t('users.sessions')}
							</TableHead>
							<TableHead className="w-[150px] max-sm:w-auto">
								{t('users.createdAt')}
							</TableHead>
							<TableHead className="w-[150px] max-sm:w-auto">
								{t('users.updatedAt')}
							</TableHead>
							<TableHead className="w-[50px] max-sm:w-auto"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="flex">
									<Tooltip delayDuration={400}>
										<TooltipTrigger asChild>
											<Link
												to={`/admin/users/${user.username}`}
												className="flex flex-shrink items-center gap-3"
												viewTransition
											>
												<Avatar
													className="bg-muted ring-ring ring-1 max-sm:hidden"
													aria-hidden={true}
												>
													<AvatarImage
														src={getUserImgSrc(user.image?.objectKey)}
														alt={user.name || user.username}
													/>
													<AvatarFallback>
														{getInitials(`${user.name} ${user.username}`)}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col text-left text-sm leading-tight">
													<span className="font-semibold">{user.name}</span>
													<span className="text-muted-foreground truncate text-xs">
														{user.email}
													</span>
												</div>
											</Link>
										</TooltipTrigger>
										<TooltipContent>Edit</TooltipContent>
									</Tooltip>
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{user.roles.map((role) => (
											<Badge variant="secondary" key={role.id}>
												{role.name}
											</Badge>
										))}
									</div>
								</TableCell>
								<TableCell className="text-center">
									{user.sessions.length}
								</TableCell>
								<TableCell>
									<Tooltip delayDuration={400}>
										<TooltipTrigger className="text-left">
											{user.date.distanceToNow}
										</TooltipTrigger>
										<TooltipContent>{user.date.formatted}</TooltipContent>
									</Tooltip>
								</TableCell>
								<TableCell>
									<Tooltip delayDuration={400}>
										<TooltipTrigger className="text-left">
											{user.updatedAt.distanceToNow}
										</TooltipTrigger>
										<TooltipContent>{user.updatedAt.formatted}</TooltipContent>
									</Tooltip>
								</TableCell>
								<TableCell>
									<UserActionsDropdown
										user={user}
										onSelectDelete={() =>
											setActiveDialog({ user, name: 'delete' })
										}
										onSelectSignOutSessions={() =>
											setActiveDialog({ user, name: 'signOutSessions' })
										}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter className="bg-transparent hover:bg-transparent">
						<TableRow className="bg-transparent hover:bg-transparent">
							<TableCell
								colSpan={1}
								className="text-xs text-gray-500 dark:text-gray-400"
							>
								{t('table.usersCountSummary', {
									context: totalUsers <= take ? 'singlePage' : 'multiplePages',
									count: totalUsers,
									from: Math.min(totalUsers, skip + 1),
									to: Math.min(take + skip, totalUsers),
								})}
							</TableCell>
							<TableCell colSpan={5}>
								{totalUsers > take && (
									<PaginationBar total={totalUsers} defaultTake={take} />
								)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
				<DeleteUserDialog
					user={
						(activeDialog?.name === 'delete' && activeDialog?.user) || undefined
					}
					onSubmit={() => setActiveDialog(undefined)}
				/>
				<SignOutSessionsDialog
					user={
						(activeDialog?.name === 'signOutSessions' && activeDialog?.user) ||
						undefined
					}
					onSubmit={() => setActiveDialog(undefined)}
				/>
			</>
		)
	)
}

function UserActionsDropdown({
	user,
	onSelectDelete,
	onSelectSignOutSessions,
}: {
	user: UserRow
	onSelectDelete: () => void
	onSelectSignOutSessions: () => void
}) {
	const { t } = useTranslation()

	return (
		<DropdownMenu>
			<Tooltip delayDuration={400}>
				<TooltipTrigger className="text-left" asChild>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<AccessibleIcon label="Actions">
								<MoreHorizontal />
							</AccessibleIcon>
						</Button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent>Actions</TooltipContent>
			</Tooltip>
			<DropdownMenuContent align="end">
				<Link to={`/admin/users/${user.username}`}>
					<Button variant="ghost" className="size-full justify-start p-0">
						<DropdownMenuItem className="w-full">
							<UserPen />
							{t('users.edit')}
						</DropdownMenuItem>
					</Button>
				</Link>
				<DropdownMenuItem
					onSelect={onSelectSignOutSessions}
					disabled={user.sessions.length === 0}
				>
					<LogOut />
					{t('users.signOutOfAllSessions')}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" onSelect={onSelectDelete}>
					<Trash />
					{t('users.delete')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function DeleteUserDialog({
	user,
	onSubmit,
}: {
	user?: UserRow
	onSubmit: () => void
}) {
	const [open, setOpen] = useState(!!user)
	const fetcher = useFetcher<typeof deleteUserAction>()

	useEffect(() => {
		setOpen(!!user)
	}, [user])

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent aria-label={user && `Delete user ${user.name}`}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					{user && (
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete{' '}
							<b>{user.name}</b> from our servers.
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<fetcher.Form method="POST" onSubmit={() => onSubmit()}>
						<AlertDialogAction asChild>
							<>
								<StatusButton
									type="submit"
									name="intent"
									value={deleteDataActionIntent}
									variant="destructive"
									status={fetcher.state !== 'idle' ? 'pending' : 'idle'}
								>
									Delete
								</StatusButton>
								{<input type="hidden" name="userId" value={user?.id} />}
							</>
						</AlertDialogAction>
					</fetcher.Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
function SignOutSessionsDialog({
	user,
	onSubmit,
}: {
	user?: UserRow
	onSubmit: () => void
}) {
	const [open, setOpen] = useState(!!user)
	const fetcher = useFetcher<typeof deleteUserAction>()

	useEffect(() => {
		setOpen(!!user)
	}, [user])

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent
				aria-label={user && `Sign out of all ${user.name} sessions`}
			>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					{user && (
						<AlertDialogDescription>
							This action will sign out of all <b>{user.name}</b> sessions (
							{user?.sessions.length}).
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<fetcher.Form method="POST" onSubmit={() => onSubmit()}>
						<AlertDialogAction asChild>
							<>
								<StatusButton
									type="submit"
									name="intent"
									value={signOutOfSessionsActionIntent}
									variant="destructive"
									status={fetcher.state !== 'idle' ? 'pending' : 'idle'}
								>
									Sign out all sessions
								</StatusButton>
								{<input type="hidden" name="userId" value={user?.id} />}
							</>
						</AlertDialogAction>
					</fetcher.Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const meta: Route.MetaFunction = ({}) => {
	return [
		{ title: `Users | ${ENV.APP_NAME} Administration` },
		{
			name: 'description',
			content: `Users on ${ENV.APP_NAME} Administration`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
