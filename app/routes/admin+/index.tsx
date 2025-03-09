import { type ReactNode } from 'react'
import { type UseTranslationResponse } from 'react-i18next'
import { redirect, type UIMatch } from 'react-router'
import { z } from 'zod'

export const BreadcrumbHandle = z.strictObject({
	breadcrumb: z
		.function()
		.args(
			z.custom<{
				match: UIMatch
				t: UseTranslationResponse<'common', unknown>[0]
			}>(),
		)
		.returns(z.custom<ReactNode>()),
})
export type BreadcrumbHandle = z.infer<typeof BreadcrumbHandle>

export const BreadcrumbHandleMatch = z.object({
	handle: BreadcrumbHandle,
})

export const loader = async () => {
	return redirect('/admin/users')
}
