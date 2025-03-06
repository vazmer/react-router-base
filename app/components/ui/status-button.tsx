import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { Check, LoaderCircle, X } from 'lucide-react'
import * as React from 'react'
import { useSpinDelay } from 'spin-delay'
import { Button } from './button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip.tsx'
import { cn } from '@/lib/utils.ts'

function StatusButton({
	message,
	status,
	className,
	children,
	spinDelay,
	asChild,
	...props
}: React.ComponentProps<typeof Button> & {
	status: 'pending' | 'success' | 'error' | 'idle'
	message?: string | null
	spinDelay?: Parameters<typeof useSpinDelay>[1]
}) {
	const delayedPending = useSpinDelay(status === 'pending', {
		delay: 400,
		minDuration: 300,
		...spinDelay,
	})
	const companion = {
		pending: delayedPending ? (
			<div
				role="status"
				className="inline-flex h-6 w-6 items-center justify-center"
			>
				<AccessibleIcon label="loading">
					<LoaderCircle className="animate-spin" />
				</AccessibleIcon>
			</div>
		) : null,
		success: (
			<div
				role="status"
				className="inline-flex h-6 w-6 items-center justify-center"
			>
				<AccessibleIcon label="success">
					<Check />
				</AccessibleIcon>
			</div>
		),
		error: (
			<div
				role="status"
				className="bg-destructive inline-flex h-6 w-6 items-center justify-center rounded-full"
			>
				<AccessibleIcon label="error">
					<X className="text-destructive-foreground" />
				</AccessibleIcon>
			</div>
		),
		idle: null,
	}[status]

	return (
		(!children && !message && !companion) ?? (
			<Button
				data-slot="button"
				className={cn('flex justify-center gap-1', className)}
				{...props}
			>
				<div>{children}</div>
				{message ? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>{companion}</TooltipTrigger>
							<TooltipContent>{message}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					companion
				)}
			</Button>
		)
	)
}

export { StatusButton }
