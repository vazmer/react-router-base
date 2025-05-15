import { invariantResponse } from '@epic-web/invariant'
import React, { useEffect, useRef, useState } from 'react'
import { useFetcher, useSubmit } from 'react-router'
import { type Route } from './+types/delete'
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
	await prisma.user.delete({ where: { id: userId } })
	return redirectWithToast(redirectTo, {
		type: 'success',
		title: 'User Deleted',
		description: 'The user has been successfully deleted from the system.',
	})
}

export function DeleteUserDialog({
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
			<AlertDialogContent aria-label={user && `Delete user ${user.name}`}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					{user && (
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete{' '}
							<b>{user.name}</b> from our servers.
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{user?.id && (
						<fetcher.Form
							ref={formRef}
							method="POST"
							action="/admin/users/delete"
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
