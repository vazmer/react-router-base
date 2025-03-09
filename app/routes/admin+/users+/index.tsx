import { getFormProps, useForm } from '@conform-to/react'
import { type Prisma } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { SearchIcon } from 'lucide-react'
import React, { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Form,
	Link,
	useLocation,
	useSearchParams,
	useSubmit,
} from 'react-router'
import { type Route } from './+types/index'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { PaginationBar } from '@/components/pagination-bar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
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
import { prisma } from '@/utils/db.server.ts'
import { useDateFnsLocale } from '@/utils/i18n.ts'
import { useDebounce, useIsPending } from '@/utils/misc.tsx'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)
	const searchTerm = url.searchParams.get('search')?.trim()
	const selectedRoles = url.searchParams.getAll('roles')
	const sortBy = url.searchParams.get('sortBy') || 'createdAt'
	const take = Number(url.searchParams.get('take')) || 3
	const skip = Number(url.searchParams.get('skip')) || 0

	const whereInput: Prisma.UserWhereInput = {
		AND: [
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

	const [roles, users, totalUsers, totalUnfilteredUsers] =
		await prisma.$transaction([
			prisma.role.findMany(),
			prisma.user.findMany({
				include: {
					sessions: {
						where: {
							expirationDate: { gt: new Date() },
						},
					},
					roles: { orderBy: { id: 'asc' } },
				},
				where: whereInput,
				take,
				skip,
				orderBy,
			}),
			prisma.user.count({
				where: whereInput,
			}),
			prisma.user.count(),
		])

	return {
		status: 'idle',
		roles,
		selectedRoles,
		users,
		totalUnfilteredUsers,
		pagination: {
			take,
			skip,
			total: totalUsers,
		},
	} as const
}

export default function Users({ loaderData }: Route.ComponentProps) {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	const selectedRoles = searchParams
		.getAll('roles')
		.filter((paramRole) =>
			loaderData.roles.map((role) => role.name).includes(paramRole),
		)

	const id = useId()
	const isSubmitting = useIsPending({
		formMethod: 'GET',
		formAction: location.pathname,
	})

	const [form] = useForm({
		id: 'login-form',
	})

	const handleFormChange = useDebounce(async () => {
		await submit(formRef.current)
	}, 400)

	const { t } = useTranslation()
	const localeDateFnsNs = useDateFnsLocale()

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 items-center space-x-2">
					<Form
						method="GET"
						action={location.pathname}
						autoFocus
						className="flex w-full flex-wrap justify-center gap-2"
						onChange={() => handleFormChange()}
						ref={formRef}
						{...getFormProps(form)}
					>
						<div className="relative flex grow flex-wrap items-center justify-center gap-2">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<SearchIcon className="size-4 text-gray-500 dark:text-gray-400" />
							</div>
							<div className="flex-1">
								<Label htmlFor={id} className="sr-only">
									{t('search')}
								</Label>
								<Input
									type="search"
									name="search"
									id={id}
									defaultValue={searchParams.get('search') ?? ''}
									placeholder={t('Search...')}
									className="w-full pl-8 text-sm"
									autoFocus
								/>
							</div>
							<StatusButton
								type="submit"
								variant="outline"
								status={isSubmitting ? 'pending' : loaderData.status}
								className="flex w-full items-center justify-center"
							/>
						</div>
						<MultiSelect
							label={`${t('users.roles')}:`}
							variant="secondary"
							className="max-w-[250px] min-w-[150px]"
							options={loaderData.roles.map((role) => ({
								value: role.name,
								label: role.name,
							}))}
							onValueChange={() => handleFormChange()}
							defaultValue={
								selectedRoles.length === loaderData.roles.length
									? []
									: selectedRoles
							}
							placeholder={t('users.allRoles')}
							maxCount={3}
						/>
						<Select
							name="createdAtFrom"
							defaultValue={searchParams.get('createdAtFrom') || 'last30days'}
						>
							<SelectTrigger className="items-start">
								<span className="text-muted-foreground">
									{t('users.createdAtFrom')}:
								</span>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="lastDay">{t('users.lastDay')}</SelectItem>
								<SelectItem value="last7Days">
									{t('users.last7Days')}
								</SelectItem>
								<SelectItem value="last30days">
									{t('users.last30Days')}
								</SelectItem>
								<SelectItem value="lastQuarter">
									{t('users.lastQuarter')}
								</SelectItem>
								<SelectItem value="lastYear">{t('users.lastYear')}</SelectItem>
							</SelectContent>
						</Select>
						<Select
							name="sortBy"
							defaultValue={searchParams.get('sortBy') || 'createdAt'}
						>
							<SelectTrigger className="items-start">
								<span className="text-muted-foreground">
									{t('users.sortBy')}:
								</span>
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
					</Form>
				</div>
			</div>
			{loaderData.pagination.total > 0 && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t('users.name')}</TableHead>
							<TableHead className="w-[200px]">{t('users.roles')}</TableHead>
							<TableHead className="w-[100px] text-center">
								{t('users.sessions')}
							</TableHead>
							<TableHead className="w-[150px]">
								{t('users.createdAt')}
							</TableHead>
							<TableHead className="w-[150px]">
								{t('users.updatedAt')}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loaderData.users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>
									<div className="flex flex-col space-y-0.5">
										<div className="font-medium">
											<Link to={`/admin/users/${user.username}`}>
												{user.name}
											</Link>
										</div>
										<div className="dark:text-zink-200 text-xs text-slate-500">
											{user.email}
										</div>
									</div>
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
									{formatDistanceToNow(user.createdAt, {
										locale: localeDateFnsNs,
										addSuffix: true,
									})}
								</TableCell>
								<TableCell>
									{formatDistanceToNow(user.updatedAt, {
										locale: localeDateFnsNs,
										addSuffix: true,
									})}
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
								Showing{' '}
								{Math.min(
									loaderData.pagination.total,
									loaderData.pagination.skip + 1,
								)}
								-
								{Math.min(
									loaderData.pagination.take + loaderData.pagination.skip,
									loaderData.pagination.total,
								)}{' '}
								of {loaderData.pagination.total} users
							</TableCell>
							<TableCell colSpan={4}>
								<PaginationBar
									total={loaderData.pagination.total}
									defaultTake={loaderData.pagination.take}
								/>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			)}
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
