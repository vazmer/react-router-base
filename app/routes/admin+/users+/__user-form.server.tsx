import { parseWithZod } from '@conform-to/zod'
import { parseFormData } from '@mjackson/form-data-parser'
import { createId as cuid } from '@paralleldrive/cuid2'
import { data } from 'react-router'
import { z } from 'zod'
import { type Route } from './+types/$username.ts'
import { UserFormSchema } from './__user-form'
import { getPasswordHash } from '@/utils/auth.server.ts'
import { prisma } from '@/utils/db.server.ts'
import { uploadProfileImage } from '@/utils/storage.server.ts'
import { createToastHeaders, redirectWithToast } from '@/utils/toast.server.ts'
import { MAX_UPLOAD_SIZE } from '@/utils/user-validation.ts'

export async function action({ request, params }: Route.ActionArgs) {
	const formData = await parseFormData(request, {
		maxFileSize: MAX_UPLOAD_SIZE,
	})
	const submission = await parseWithZod(formData, {
		schema: UserFormSchema.superRefine(async ({ id, username, email }, ctx) => {
			if (id) {
				const user = await prisma.user.findUnique({
					select: { id: true },
					where: { id },
				})

				if (!user) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'User not found',
					})
					return
				}
			}

			const existingUsername = await prisma.user.findUnique({
				select: { id: true },
				where: { username },
			})
			if (existingUsername && existingUsername.id !== id) {
				ctx.addIssue({
					path: ['username'],
					code: z.ZodIssueCode.custom,
					message: 'A user already exists with this username',
				})
			}

			const existingEmail = await prisma.user.findUnique({
				select: { id: true },
				where: { email },
			})
			if (existingEmail && existingEmail.id !== id) {
				ctx.addIssue({
					path: ['email'],
					code: z.ZodIssueCode.custom,
					message: 'A user already exists with this email',
				})
			}
		}).transform(async ({ image = {}, ...data }) => {
			const userId = data.id ?? cuid()
			return {
				...data,
				id: userId,
				image: {
					id: image.id,
					objectKey: image.file
						? await uploadProfileImage(userId, image.file)
						: undefined,
				},
			}
		}),
		async: true,
	})

	if (submission.status !== 'success' || !submission.value) {
		return data(
			{ result: submission.reply(), user: undefined },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { id: userId, username, name, email, image, roles } = submission.value
	const user = await prisma.user.upsert({
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			roles: { select: { id: true, name: true } },
			image: { select: { id: true, objectKey: true } },
		},
		where: { id: userId },
		create: {
			id: userId,
			username,
			email,
			name,
			password: {
				create: {
					hash: await getPasswordHash(username),
				},
			},
			roles: {
				connect: [
					...roles.map((roleName) => ({
						name: roleName,
					})),
				],
			},
			image: image.objectKey
				? { create: { id: image.id, objectKey: image.objectKey } }
				: undefined,
		},
		update: {
			name,
			email,
			username,
			roles: {
				set: [
					...roles.map((roleName) => ({
						name: roleName,
					})),
				],
			},
			image: {
				upsert: {
					where: { id: image.id },
					create: { id: image.id, objectKey: image.objectKey || '' },
					update: { id: image.id, objectKey: image.objectKey },
				},
			},
		},
	})

	if (!params.username) {
		return redirectWithToast('/admin/users', {
			description: `User ${user.name} created`,
			type: 'success',
		})
	}

	if (params.username !== user.username) {
		return redirectWithToast(`/admin/users/${user.username}`, {
			description: `User ${user.name} updated`,
			type: 'success',
		})
	}

	return data(
		{
			result: submission.reply({ resetForm: true }),
			user,
		},

		{
			headers: await createToastHeaders({
				description: `User ${user.name} updated`,
				type: 'success',
			}),
		},
	)
}
