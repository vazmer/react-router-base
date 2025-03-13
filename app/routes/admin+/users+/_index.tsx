import {
	getFormProps,
	getInputProps,
	getSelectProps,
	useForm,
} from '@conform-to/react'
import { type Prisma } from '@prisma/client'
import { type Duration, formatDistanceToNow, intlFormat, sub } from 'date-fns'
import { type IntlFormatFormatOptions } from 'date-fns/intlFormat'
import { Plus, SearchIcon } from 'lucide-react'
import React, { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Form,
	Link,
	useLoaderData,
	useSearchParams,
	useSubmit,
} from 'react-router'
import { z } from 'zod'
import { type Route } from './+types/_index'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { PaginationBar } from '@/components/pagination-bar.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { buttonVariants } from '@/components/ui/button.tsx'
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

export const FilterSchema = z.object({
	status: z.string(),
	author: z.string(),
})

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)
	const searchTerm = url.searchParams.get('search')?.trim()
	const selectedRoles = url.searchParams.getAll('roles')
	const sortBy = url.searchParams.get('sortBy') || 'createdAt'
	const take = Number(url.searchParams.get('take')) || 15
	const skip = Number(url.searchParams.get('skip')) || 0
	const createdAtFrom = url.searchParams.get('createdAtFrom') || 'all'

	let createdAtWhereInput: Prisma.UserWhereInput = {}
	if (!!createdAtFrom && createdAtFrom !== 'all') {
		let createdAtFromSub: Duration = {}
		switch (createdAtFrom) {
			case 'lastDay':
				createdAtFromSub = { days: 1 }
				break
			case 'last7Days':
				createdAtFromSub = { days: 7 }
				break
			case 'last30Days':
				createdAtFromSub = { months: 1 }
				break
			case 'lastQuarter':
				createdAtFromSub = { months: 3 }
				break
			case 'lastYear':
				createdAtFromSub = { years: 1 }
				break
			default:
				break
		}
		createdAtWhereInput = {
			createdAt: {
				gte: sub(new Date(), createdAtFromSub),
			},
		}
	}

	const whereInput: Prisma.UserWhereInput = {
		AND: [
			createdAtWhereInput,
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

	const sortOrder: Prisma.SortOrder = 'desc'
	const orderBy: Prisma.UserOrderByWithRelationInput[] = [
		{ createdAt: sortOrder },
	]
	switch (sortBy) {
		case 'updatedAt':
		case 'name':
		case 'email':
		case 'username':
			orderBy.unshift({ [sortBy]: sortOrder })
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

	return {
		status: 'idle',
		roles,
		selectedRoles,
		users: users.map((user) => ({
			...user,
			createdAt: {
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
		pagination: {
			take,
			skip,
			total: totalUsers,
		},
	} as const
}

export default function Users() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 items-center justify-between space-x-2">
					<UserFiltersForm />
					<Link
						to="/admin/users/new"
						className={cn(buttonVariants(), { size: '8' })}
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
	const { roles } = useLoaderData<typeof loader>()
	// const location = useLocation()
	const [searchParams] = useSearchParams()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	const selectedRoles = searchParams
		.getAll('roles')
		.filter((paramRole) => roles.map((role) => role.name).includes(paramRole))

	const id = useId()
	// const isSubmitting = useIsPending({
	// 	formMethod: 'GET',
	// 	formAction: location.pathname,
	// })

	const [form, fields] = useForm({
		id: 'login-form',
		defaultValue: {
			search: searchParams.get('search') ?? '',
			createdAtFrom: searchParams.get('createdAtFrom') || 'all',
		},
	})

	const handleFormChange = useDebounce(async () => {
		await submit(formRef.current)
	}, 400)

	const { t } = useTranslation()

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
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon className="size-4 text-gray-500 dark:text-gray-400" />
				</div>
				<Label htmlFor={id} className="sr-only">
					{t('search')}
				</Label>
				<Input
					placeholder={t('Search...')}
					className="w-full pl-8 text-sm"
					autoFocus
					{...getInputProps(fields.search, { type: 'search' })}
					id={id}
				/>
			</div>
			<MultiSelect
				name="roles"
				label={`${t('users.roles')}:`}
				variant="secondary"
				className="max-w-[250px] min-w-[150px]"
				options={roles.map((role) => ({
					value: role.name,
					label: role.name,
				}))}
				onValueChange={() => handleFormChange()}
				defaultValue={
					selectedRoles.length === roles.length ? [] : selectedRoles
				}
				placeholder={t('users.allRoles')}
				maxCount={3}
			/>
			<Select
				{...getSelectProps(fields.createdAtFrom)}
				defaultValue={fields.createdAtFrom.initialValue}
			>
				<SelectTrigger className="items-start">
					<span className="text-muted-foreground">
						{t('users.createdAtFrom')}:
					</span>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">{t('users.All')}</SelectItem>
					<SelectItem value="lastDay">{t('users.lastDay')}</SelectItem>
					<SelectItem value="last7Days">{t('users.last7Days')}</SelectItem>
					<SelectItem value="last30Days">{t('users.last30Days')}</SelectItem>
					<SelectItem value="lastQuarter">{t('users.lastQuarter')}</SelectItem>
					<SelectItem value="lastYear">{t('users.lastYear')}</SelectItem>
				</SelectContent>
			</Select>
			<Select
				name="sortBy"
				defaultValue={searchParams.get('sortBy') || 'createdAt'}
			>
				<SelectTrigger className="items-start">
					<span className="text-muted-foreground">{t('users.sortBy')}:</span>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="name">{t('users.sortBy.name')}</SelectItem>
					<SelectItem value="email">{t('users.sortBy.email')}</SelectItem>
					<SelectItem value="session">
						{t('users.sortBy.sessionCount')}
					</SelectItem>
					<SelectItem value="createdAt">
						{t('users.sortBy.createdAt')}
					</SelectItem>
					<SelectItem value="updatedAt">
						{t('users.sortBy.updatedAt')}
					</SelectItem>
				</SelectContent>
			</Select>
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

function UsersTable() {
	const { pagination, users } = useLoaderData<typeof loader>()
	const { t } = useTranslation()

	return (
		pagination.total > 0 && (
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
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Tooltip delayDuration={400}>
									<TooltipTrigger>
										<Link
											to={`/admin/users/${user.username}`}
											className="flex items-center gap-3 font-semibold"
											viewTransition
										>
											<Avatar
												className="bg-muted ring-ring size-8 rounded-r-full ring-1 max-sm:hidden"
												aria-hidden={true}
											>
												<AvatarImage
													src={getUserImgSrc(user.image?.objectKey)}
													alt={user.name || user.username}
												/>
												<AvatarFallback className="rounded-lg">
													{getInitials(`${user.name} ${user.username}`)}
												</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="">{user.name}</span>

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
									<TooltipTrigger>
										{user.createdAt.distanceToNow}
									</TooltipTrigger>
									<TooltipContent>{user.createdAt.formatted}</TooltipContent>
								</Tooltip>
							</TableCell>
							<TableCell>
								<Tooltip delayDuration={400}>
									<TooltipTrigger>
										{user.updatedAt.distanceToNow}
									</TooltipTrigger>
									<TooltipContent>{user.updatedAt.formatted}</TooltipContent>
								</Tooltip>
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
								context:
									pagination.total <= pagination.take
										? 'singlePage'
										: 'multiplePages',
								count: pagination.total,
								from: Math.min(pagination.total, pagination.skip + 1),
								to: Math.min(
									pagination.take + pagination.skip,
									pagination.total,
								),
							})}
						</TableCell>
						<TableCell colSpan={4}>
							{pagination.total > pagination.take && (
								<PaginationBar
									total={pagination.total}
									defaultTake={pagination.take}
								/>
							)}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		)
	)
}

export const meta: Route.MetaFunction = ({}) => {
	return [
		{ title: `Users | App Administration` },
		{
			name: 'description',
			content: `Users on App Administration`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
