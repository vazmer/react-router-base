import { useSearchParams } from 'react-router'
import {
	Pagination,
	PaginationContent,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx'

function PaginationBar({
	total,
	defaultTake = 1,
	maxPages = 5,
}: {
	total: number
	defaultTake?: number
	maxPages?: number
}) {
	const [searchParams] = useSearchParams()
	const skip = Number(searchParams.get('skip')) || 0
	const take = Number(searchParams.get('take')) || defaultTake
	const totalPages = Math.ceil(total / take)
	const currentPage = Math.floor(skip / take) + 1
	const halfMaxPages = Math.floor(maxPages / 2)
	const canPageBackwards = skip > 0
	const canPageForwards = skip + take < total
	const pageNumbers = [] as Array<number>
	if (totalPages <= maxPages) {
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i)
		}
	} else {
		let startPage = currentPage - halfMaxPages
		let endPage = currentPage + halfMaxPages
		if (startPage < 1) {
			endPage += Math.abs(startPage) + 1
			startPage = 1
		}
		if (endPage > totalPages) {
			startPage -= endPage - totalPages
			endPage = totalPages
		}
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i)
		}
	}
	return (
		<Pagination className="justify-end">
			<PaginationContent>
				<PaginationItem>
					<Tooltip>
						<TooltipTrigger>
							<PaginationFirst
								className="size-8 text-xs"
								disabled={!canPageBackwards}
								to={{
									search: setSearchParamsString(searchParams, {
										skip: 0,
									}),
								}}
							/>
						</TooltipTrigger>
						<TooltipContent>Go to First</TooltipContent>
					</Tooltip>
				</PaginationItem>
				<PaginationItem>
					<Tooltip>
						<TooltipTrigger>
							<PaginationPrevious
								className="size-8 text-xs"
								disabled={!canPageBackwards}
								to={{
									search: setSearchParamsString(searchParams, {
										skip: Math.max(skip - take, 0),
									}),
								}}
							/>
						</TooltipTrigger>
						<TooltipContent>Go to Previous</TooltipContent>
					</Tooltip>
				</PaginationItem>
				{pageNumbers.map((pageNumber) => (
					<PaginationItem key={pageNumber}>
						<PaginationLink
							className="size-8 text-xs disabled:opacity-100"
							to={{
								search: setSearchParamsString(searchParams, {
									skip: (pageNumber - 1) * take,
								}),
							}}
							isActive={pageNumber === currentPage}
						>
							{pageNumber}
						</PaginationLink>
					</PaginationItem>
				))}
				{/*<PaginationItem>*/}
				{/*	<PaginationEllipsis />*/}
				{/*</PaginationItem>*/}
				<PaginationItem>
					<Tooltip>
						<TooltipTrigger>
							<PaginationNext
								className="size-8 text-xs"
								disabled={!canPageForwards}
								to={{
									search: setSearchParamsString(searchParams, {
										skip: skip + take,
									}),
								}}
							/>
						</TooltipTrigger>
						<TooltipContent>Go to Next</TooltipContent>
					</Tooltip>
				</PaginationItem>
				<PaginationItem>
					<Tooltip>
						<TooltipTrigger>
							<PaginationLast
								className="size-8 text-xs"
								disabled={!canPageForwards}
								to={{
									search: setSearchParamsString(searchParams, {
										skip: (totalPages - 1) * take,
									}),
								}}
							/>
						</TooltipTrigger>
						<TooltipContent>Go to Last</TooltipContent>
					</Tooltip>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

function setSearchParamsString(
	searchParams: URLSearchParams,
	changes: Record<string, string | number | undefined>,
) {
	const newSearchParams = new URLSearchParams(searchParams)
	for (const [key, value] of Object.entries(changes)) {
		if (value === undefined) {
			newSearchParams.delete(key)
			continue
		}
		newSearchParams.set(key, String([value]))
	}
	return newSearchParams.toString()
}

export { PaginationBar }
