import { type SuperRefinement, z } from 'zod'

export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 20

export const UsernameSchema = z
	.string({ required_error: 'Username is required' })
	.trim()
	.min(USERNAME_MIN_LENGTH, { message: 'Username is too short' })
	.max(USERNAME_MAX_LENGTH, { message: 'Username is too long' })
	.regex(/^[a-zA-Z0-9_]+$/, {
		message: 'Username can only include letters, numbers, and underscores',
	})
	// users can type the username in any case, but we store it in lowercase
	.transform((value) => value.toLowerCase())

export const PasswordSchema = z
	.string({ required_error: 'Password is required' })
	.min(6, { message: 'Password is too short' })
	// NOTE: bcrypt has a limit of 72 bytes (which should be plenty long)
	// https://github.com/epicweb-dev/epic-stack/issues/918
	.refine((val) => new TextEncoder().encode(val).length <= 72, {
		message: 'Password is too long',
	})

export const NameSchema = z
	.string({ required_error: 'Name is required' })
	.trim()
	.min(3, { message: 'Name is too short' })
	.max(40, { message: 'Name is too long' })
	.includes(' ', {
		message: 'Name must include first and last name separated by empty space',
	})

export const EmailSchema = z
	.string({ required_error: 'Email is required' })
	.trim()
	.email({ message: 'Email is invalid' })
	.min(3, { message: 'Email is too short' })
	.max(100, { message: 'Email is too long' })
	// users can type the email in any case, but we store it in lowercase
	.transform((value) => value.toLowerCase())

export const RolesSchema = z
	.array(z.enum(['admin', 'user']))
	.nonempty({ message: 'Role is required' })

export const PasswordAndConfirmPasswordSchema = z.object({
	password: PasswordSchema,
	confirmPassword: PasswordSchema,
})

export const passwordAndConfirmRefine: SuperRefinement<
	Partial<z.infer<typeof PasswordAndConfirmPasswordSchema>>
> = (data, ctx) => {
	if (data?.confirmPassword !== data?.password) {
		ctx.addIssue({
			path: ['confirmPassword'],
			code: 'custom',
			message: 'The passwords must match',
		})
	}
}

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

export const ImageFieldsetSchema = z.object({
	id: z.string().optional(),
	file: z
		.instanceof(File)
		.optional()
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE
		}, 'File size must be less than 3MB'),
	altText: z.string().optional(),
})

export type ImageFieldsetSchema = z.infer<typeof ImageFieldsetSchema>
