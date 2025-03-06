import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from 'lucide-react'
import * as React from 'react'

import { Link } from 'react-router'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	disabled?: boolean
	isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'> &
	React.ComponentProps<typeof Link>

function PaginationLink({
	className,
	disabled,
	isActive,
	size = 'sm',
	variant = 'outline',
	children,
	...props
}: PaginationLinkProps) {
	return disabled || isActive ? (
		<Button
			className={className}
			size={size}
			variant={isActive ? 'default' : variant}
			disabled
		>
			{children}
		</Button>
	) : (
		<Link
			className={cn(
				buttonVariants({
					variant,
					size,
				}),
				className,
			)}
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			preventScrollReset
			prefetch="intent"
			{...props}
		>
			{children}
		</Link>
	)
}

function PaginationFirst({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			variant="ghost"
			aria-label="Go to first page"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}
		>
			<AccessibleIcon label="First">
				<DoubleArrowLeftIcon />
			</AccessibleIcon>
		</PaginationLink>
	)
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			variant="ghost"
			aria-label="Go to previous page"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}
		>
			<ChevronLeftIcon />
			{/*<span>Previous</span>*/}
		</PaginationLink>
	)
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			variant="ghost"
			className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
			size="icon"
			{...props}
		>
			{/*<span>Next</span>*/}
			<ChevronRightIcon />
		</PaginationLink>
	)
}

function PaginationLast({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			variant="ghost"
			aria-label="Go to last page"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}
		>
			<AccessibleIcon label="Last">
				<DoubleArrowRightIcon />
			</AccessibleIcon>
		</PaginationLink>
	)
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<AccessibleIcon label="More pages">
				<MoreHorizontalIcon className="size-4" />
			</AccessibleIcon>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationFirst,
	PaginationPrevious,
	PaginationNext,
	PaginationLast,
	PaginationEllipsis,
}
