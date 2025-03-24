import {
	getFormProps,
	getInputProps,
	getSelectProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { type Duration, formatDistanceToNow, intlFormat, sub } from 'date-fns'
import { type IntlFormatFormatOptions } from 'date-fns/intlFormat'
import { ArrowDown, ArrowUp, Plus, SearchIcon } from 'lucide-react'
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { data, Form, Link, useLoaderData, useSubmit } from 'react-router'
import { z } from 'zod'
import { type Route } from './+types/_index'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { PaginationBar } from '@/components/pagination-bar.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
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

export default function UsersRoute() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 justify-between space-x-2">
					<UserFiltersForm />
					<Link
						to="/admin/users/new"
						className={cn(buttonVariants(), 'self-start')}
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
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon className="size-4 text-gray-500 dark:text-gray-400" />
				</div>
				<Label htmlFor={fields.search.id} className="sr-only">
					{t('search')}
				</Label>
				<Input
					placeholder={t('Search...')}
					className="w-full pl-8 text-sm"
					autoFocus
					{...getInputProps(fields.search, { type: 'search' })}
				/>
			</div>
			<Tooltip>
				<TooltipTrigger>
					<Select
						{...getSelectProps(fields.dateFrom)}
						defaultValue={fields.dateFrom.initialValue}
					>
						<SelectTrigger className="items-start">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="anytime">{t('users.anytime')}</SelectItem>
							<SelectItem value="lastDay">{t('users.lastDay')}</SelectItem>
							<SelectItem value="last7Days">{t('users.last7Days')}</SelectItem>
							<SelectItem value="last30Days">
								{t('users.last30Days')}
							</SelectItem>
							<SelectItem value="lastQuarter">
								{t('users.lastQuarter')}
							</SelectItem>
							<SelectItem value="lastYear">{t('users.lastYear')}</SelectItem>
						</SelectContent>
					</Select>
				</TooltipTrigger>
				<TooltipContent>Updated or created date</TooltipContent>
			</Tooltip>
			<MultiSelect
				name="roles"
				// label={`${t('users.roles')}:`}
				variant="secondary"
				className="max-w-[250px]"
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

function UsersTable() {
	const { totalUsers, users, formData } = useLoaderData<typeof loader>()
	const { take, skip } = formData
	const { t } = useTranslation()

	return (
		totalUsers > 0 && (
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
						<TableCell colSpan={4}>
							{totalUsers > take && (
								<PaginationBar total={totalUsers} defaultTake={take} />
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
		{ title: `Users | Rr App Administration` },
		{
			name: 'description',
			content: `Users on Rr App Administration`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
