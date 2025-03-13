import { invariantResponse } from '@epic-web/invariant'
import React from 'react'
import { type Route } from './+types/$username'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { UserForm } from '@/routes/admin+/users+/__user-form.tsx'
import { prisma } from '@/utils/db.server.ts'

export { action } from './__user-form.server.tsx'

export async function loader({ params }: Route.LoaderArgs) {
	const user = await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			image: { select: { id: true, objectKey: true } },
		},
		where: {
			username: params.username,
		},
	})

	invariantResponse(user, 'User not found', { status: 404 })

	return { user }
}

export default function User({
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
		{ title: `${displayName} | App Administration` },
		{
			name: 'description',
			content: `Profile of ${displayName} on App Administration`,
		},
	]
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
