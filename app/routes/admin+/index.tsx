import { type ReactNode } from 'react'
import { redirect } from 'react-router'
import { z } from 'zod'

export const BreadcrumbHandle = z.object({
	breadcrumb: z.custom<ReactNode>(),
})
export type BreadcrumbHandle = z.infer<typeof BreadcrumbHandle>

export const BreadcrumbHandleMatch = z.object({
	handle: BreadcrumbHandle,
})

export const loader = async () => {
	return redirect('/admin/users')
}
