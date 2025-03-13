import React, { useId } from 'react'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
	id,
	errors,
}: {
	id?: string
	errors?: ListOfErrors
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map((e) => (
				<li key={e} className="text-destructive text-xs font-medium">
					{e}
				</li>
			))}
		</ul>
	)
}

export function Field({
	labelProps,
	inputProps,
	errors,
	className,
}: {
	labelProps: React.ComponentProps<typeof Label>
	inputProps: React.ComponentProps<typeof Input>
	errors?: ListOfErrors
} & React.ComponentProps<'div'>) {
	const fallbackId = useId()
	const id = inputProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...inputProps}
				// // https://github.com/edmundhung/conform/issues/600#issuecomment-2074577745
				key={inputProps.key}
			/>
			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	)
}
