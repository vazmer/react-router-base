import { generateRobotsTxt } from '@nasa-gcn/remix-seo'
import { type Route } from './+types/robots[.]txt.ts'
import { getDomainUrl } from '@/utils/misc.tsx'

export function loader({ request }: Route.LoaderArgs) {
	return generateRobotsTxt([
		{ type: 'sitemap', value: `${getDomainUrl(request)}/sitemap.xml` },
	])
}
