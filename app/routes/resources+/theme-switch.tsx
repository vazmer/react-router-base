import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { data, redirect, useFetcher, useFetchers } from 'react-router'
import { ServerOnly } from 'remix-utils/server-only'
import { z } from 'zod'
import { type Route } from './+types/theme-switch.ts'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import { useHints, useOptionalHints } from '@/utils/client-hints.tsx'
import { useOptionalRequestInfo, useRequestInfo } from '@/utils/request-info.ts'
import { setTheme } from '@/utils/theme.server.ts'

const ThemeFormSchema = z.object({
	theme: z.enum(['light', 'dark']),
	// this is useful for progressive enhancement
	redirectTo: z.string().optional(),
})

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ThemeFormSchema,
	})

	invariantResponse(submission.status === 'success', 'Invalid theme received')

	const { theme, redirectTo } = submission.value

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	if (redirectTo) {
		return redirect(redirectTo, responseInit)
	} else {
		return data({ result: submission.reply() }, responseInit)
	}
}

export function ThemeSwitch({ className }: React.ComponentProps<'form'> & {}) {
	const fetcher = useFetcher<typeof action>()
	const requestInfo = useRequestInfo()

	const [form] = useForm({
		id: 'theme-switch',
		lastResult: fetcher.data?.result,
	})

	const mode = useTheme()
	const nextMode = mode === 'light' ? 'dark' : 'light'

	return (
		<fetcher.Form
			method="POST"
			{...getFormProps(form)}
			action="/resources/theme-switch"
			className={className}
		>
			<ServerOnly>
				{() => (
					<input type="hidden" name="redirectTo" value={requestInfo.path} />
				)}
			</ServerOnly>
			<input type="hidden" name="theme" value={nextMode} />
			<div className="flex gap-2">
				<Button
					type="submit"
					variant="ghost"
					size="icon"
					className={cn('size-8', className)}
				>
					<AccessibleIcon label={mode}>
						{mode === 'light' ? <Sun /> : <Moon />}
					</AccessibleIcon>
				</Button>
			</div>
		</fetcher.Form>
	)
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(
		(f) => f.formAction === '/resources/theme-switch',
	)

	if (themeFetcher?.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: ThemeFormSchema,
		})

		if (submission.status === 'success') {
			return submission.value.theme
		}
	}
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	return optimisticMode ?? requestInfo.userPrefs.theme ?? hints.theme
}

export function useOptionalTheme() {
	const optionalHints = useOptionalHints()
	const optionalRequestInfo = useOptionalRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	return (
		optimisticMode ??
		optionalRequestInfo?.userPrefs.theme ??
		optionalHints?.theme
	)
}
