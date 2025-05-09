import { invariantResponse } from '@epic-web/invariant'
import React, { useEffect, useRef, useState } from 'react'
import { useFetcher, useSubmit } from 'react-router'
import { type Route } from './+types/sign-out-sessions'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx'
import { buttonVariants } from '@/components/ui/button.tsx'
import { StatusButton } from '@/components/ui/status-button.tsx'
import { type User } from '@/prisma/generated/client.ts'
import { prisma } from '@/utils/db.server.ts'
import { requireUserWithPermission } from '@/utils/permission.server.ts'
import { useRequestInfo } from '@/utils/request-info.ts'
import { redirectWithToast } from '@/utils/toast.server.ts'

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const userId = formData.get('userId')
	const redirectTo = formData.get('redirectTo')
	invariantResponse(typeof userId === 'string', 'userId must be a string')
	invariantResponse(
		typeof redirectTo === 'string',
		'redirectTo must be a string',
	)

	await requireUserWithPermission(request, 'delete:user')
	await prisma.session.deleteMany({
		where: {
			userId,
		},
	})
	return redirectWithToast(redirectTo, {
		type: 'success',
		title: 'All sessions logged out',
		description: 'The user has been successfully logged out from all sessions.',
	})
}

export function SignOutSessionsDialog({
	user,
	onClose,
}: {
	user?: Pick<User, 'id' | 'name'>
	onClose: () => void
}) {
	const [open, setOpen] = useState(!!user)
	const fetcher = useFetcher<typeof action>()
	const formRef = useRef<HTMLFormElement>(null)
	const submit = useSubmit()
	const { path: redirectTo } = useRequestInfo()

	useEffect(() => {
		if (!open) {
			onClose()
		}
	}, [open, onClose])

	useEffect(() => {
		setOpen(!!user)
	}, [user])

	const onSubmit = async () => {
		if (!user?.id) return
		await submit(formRef.current)
		setOpen(false)
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent
				aria-label={user && `Sign out of all ${user.name} sessions`}
			>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					{user && (
						<AlertDialogDescription>
							This action will sign out of all <b>{user.name}</b> sessions.
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{user?.id && (
						<fetcher.Form
							ref={formRef}
							method="POST"
							action="/admin/users/sign-out-sessions"
						>
							<input type="hidden" value={user.id} name="userId" />
							<input type="hidden" value={redirectTo} name="redirectTo" />
							<AlertDialogAction
								asChild
								className={buttonVariants({ variant: 'destructive' })}
								onClick={(e) => e.preventDefault()}
							>
								<StatusButton
									type="submit"
									variant="destructive"
									status={fetcher.state !== 'idle' ? 'pending' : 'idle'}
									onClick={onSubmit}
								>
									Delete
								</StatusButton>
							</AlertDialogAction>
						</fetcher.Form>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
