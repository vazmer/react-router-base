import React, { Fragment } from 'react'
import { Link, useMatches } from 'react-router'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { BreadcrumbHandleMatch } from '@/routes/admin+'

function Breadcrumbs() {
	const matches = useMatches()

	const breadcrumbs = matches
		.map((m) => {
			const result = BreadcrumbHandleMatch.safeParse(m)
			if (!result.success || !result.data.handle.breadcrumb) return null
			return {
				m,
				breadcrumb: result.data.handle.breadcrumb,
				data: result.data,
			}
		})
		.filter(Boolean)

	const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs
					.slice(0, breadcrumbs.length - 1)
					.map(({ m, breadcrumb, data }) => (
						<Fragment key={m.id}>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link className="flex items-center" to={m.pathname}>
										{breadcrumb(data)}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					))}
				{lastBreadcrumb && (
					<BreadcrumbItem>
						<BreadcrumbPage className="flex items-center">
							{lastBreadcrumb.breadcrumb(lastBreadcrumb.data)}
						</BreadcrumbPage>
					</BreadcrumbItem>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export { Breadcrumbs }
