import { invariantResponse } from '@epic-web/invariant'
import React from 'react'
import { type Route } from './+types/$username'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { UserForm } from '@/routes/admin+/users+/__user-form.tsx'
import { tenantPrisma } from '@/utils/db.server.ts'

export { action } from './__user-form.server.tsx'

export const handle = {
	breadcrumb: ({
		match,
	}: {
		match: { data: Route.ComponentProps['loaderData'] }
	}) => match.data?.user.name,
}

export const meta: Route.MetaFunction = ({ data, params }) => {
	const displayName = data?.user.name ?? params.username
	return [
		{ title: `${displayName} | ${ENV.APP_NAME} Administration` },
		{
			name: 'description',
			content: `Profile of ${displayName} on App Administration`,
		},
	]
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const user = await (
		await tenantPrisma(request)
	).user.findUnique({
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			roles: { select: { id: true, name: true } },
			image: { select: { id: true, objectKey: true } },
		},
		where: {
			username: params.username,
		},
	})
	invariantResponse(user, 'User not found', { status: 404 })

	return { user }
}

export default function UserRoute({
	loaderData,
	actionData,
	params,
}: Route.ComponentProps) {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="text-lg font-medium">{loaderData.user.name}</h3>
				<p className="text-muted-foreground text-sm">
					This information will be displayed publicly so be careful what you
					share.
				</p>
			</div>
			<Separator />
			<UserForm
				user={loaderData.user}
				actionData={actionData}
				params={params}
			/>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}
