import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
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
	const { t } = useTranslation()

	const breadcrumbs = matches
		.map((m) => {
			const result = BreadcrumbHandleMatch.safeParse(m)
			if (!result.success || !result.data.handle.breadcrumb) return null
			return {
				m,
				breadcrumb: result.data.handle.breadcrumb,
			}
		})
		.filter(Boolean)

	const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs
					.slice(0, breadcrumbs.length - 1)
					.map(({ m, breadcrumb }) => (
						<Fragment key={m.id}>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link className="flex items-center" to={m.pathname}>
										{t(breadcrumb)}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					))}
				{lastBreadcrumb && (
					<BreadcrumbItem>
						<BreadcrumbPage className="flex items-center">
							{t(lastBreadcrumb.breadcrumb)}
						</BreadcrumbPage>
					</BreadcrumbItem>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export { Breadcrumbs }
