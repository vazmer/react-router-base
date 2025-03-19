import {
	type FieldMetadata,
	getFieldsetProps,
	getInputProps,
	unstable_Control as Control,
	unstable_useControl as useControl,
} from '@conform-to/react'
import { type CheckboxProps } from '@radix-ui/react-checkbox'
import { type OTPInputProps, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Upload, UserRound, X } from 'lucide-react'
import { Img } from 'openimg/react'
import React, { useId, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { cn } from '@/lib/utils.ts'
import { type ImageFieldsetSchema } from '@/utils/user-validation.ts'

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
				<li key={e} className="text-destructive text-sm font-medium">
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
		<div className={cn('flex flex-col gap-2', className)}>
			<Label htmlFor={id} {...labelProps} />
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...inputProps}
				// https://github.com/edmundhung/conform/issues/600#issuecomment-2074577745
				key={inputProps.key}
			/>
			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	)
}

export function CheckboxField({
	labelProps,
	buttonProps,
	errors,
	className,
}: {
	labelProps: React.ComponentProps<'label'>
	buttonProps: Omit<CheckboxProps, 'type'> & {
		name: string
		form: string
		value?: string
	}
	errors?: ListOfErrors
	className?: string
}) {
	const { key, defaultChecked, ...checkboxProps } = buttonProps
	const fallbackId = useId()
	const checkedValue = buttonProps.value ?? 'on'
	const control = useControl({
		key,
		initialValue: defaultChecked ? buttonProps.value : '',
	})
	const id = buttonProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<div className="flex items-center gap-2">
				<Checkbox
					{...checkboxProps}
					id={id}
					ref={(element) => control.register(element?.querySelector('input'))}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					checked={control.value === checkedValue}
					onCheckedChange={(state) => {
						control.change(state.valueOf() ? checkedValue : '')
						buttonProps.onCheckedChange?.(state)
					}}
					onFocus={(event) => {
						control.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={(event) => {
						control.blur()
						buttonProps.onBlur?.(event)
					}}
					type="button"
				/>
				<label
					htmlFor={id}
					{...labelProps}
					className="text-body-xs text-muted-foreground self-center"
				/>
			</div>
			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	)
}

export function CheckboxGroupField({
	meta,
	items,
	labelProps,
	className,
	errors,
}: {
	meta: FieldMetadata<string[]>
	items: Array<{ name: string; value: string }>
	labelProps: React.ComponentProps<typeof Label>
	errors?: ListOfErrors
} & React.ComponentProps<'div'>) {
	const initialValue =
		typeof meta.initialValue === 'string'
			? [meta.initialValue]
			: (meta.initialValue ?? [])

	const errorId = errors?.length ? `${meta.id}-error` : undefined

	return (
		<fieldset className={className}>
			<Label {...labelProps} />
			<div className="flex items-center gap-4">
				{items.map((item) => (
					<Control
						key={item.value}
						meta={{
							key: meta.key,
							initialValue: initialValue.find((value) => value == item.value)
								? [item.value]
								: '',
						}}
						render={(control) => (
							<div
								className="flex items-center gap-2"
								ref={(element) => {
									control.register(element?.querySelector('input'))
								}}
							>
								<Checkbox
									id={`${meta.name}-${item.value}`}
									name={meta.name}
									value={item.value}
									checked={
										typeof control.value === 'string'
											? control.value === item.value
											: control.value?.includes(item.value)
									}
									onCheckedChange={(value) =>
										control.change(value.valueOf() ? item.value : '')
									}
									onBlur={control.blur}
									aria-invalid={errorId ? true : undefined}
									aria-describedby={errorId}
								/>
								<label
									htmlFor={`${meta.name}-${item.value}`}
									className="text-body-xs text-muted-foreground self-center"
								>
									{item.name}
								</label>
							</div>
						)}
					/>
				))}
			</div>
			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</fieldset>
	)
}

export function ImageUpload({
	meta,
	isExistingImage,
	labelProps,
	initialImage,
	onReset,
	className,
}: {
	meta: FieldMetadata<ImageFieldsetSchema>
	labelProps: React.ComponentProps<typeof Label>
	isExistingImage: boolean
	initialImage: string
	onReset: () => void
} & React.ComponentProps<'div'>) {
	const imageFieldset = meta.getFieldset()
	const [previewImage, setPreviewImage] = useState<string | null>(initialImage)

	return (
		<div className={className}>
			<Label htmlFor={imageFieldset.file.id} {...labelProps} />
			<div className="border-muted-foreground relative">
				<fieldset {...getFieldsetProps(meta)}>
					<div className="flex gap-3">
						<div className={cn('flex gap-4')}>
							<ProfileImage
								previewImage={
									imageFieldset.file.dirty ? previewImage : initialImage
								}
							/>
							{isExistingImage ? (
								<input
									{...getInputProps(imageFieldset.id, {
										type: 'hidden',
									})}
									key={imageFieldset.id.key}
								/>
							) : null}
							<div className="flex flex-col justify-center gap-1 text-xs">
								<div className="flex gap-2">
									<div className="relative flex gap-2">
										<Button
											type="button"
											variant="outline"
											size="sm"
											asChild
											className="focus-within:ring-border text-xs focus-within:ring-2"
										>
											<label htmlFor={imageFieldset.file.id}>
												<Upload />
												Select image
												<input
													{...getInputProps(imageFieldset.file, {
														type: 'file',
													})}
													key={imageFieldset.file.key}
													aria-label="Image"
													className="sr-only absolute top-0 left-0 z-0 size-full cursor-pointer"
													onChange={(event) => {
														const file = event.target.files?.[0]

														if (file) {
															const reader = new FileReader()
															reader.onloadend = () => {
																setPreviewImage(reader.result as string)
															}
															reader.readAsDataURL(file)
														} else {
															setPreviewImage(null)
														}
													}}
													accept="image/*"
												/>
											</label>
										</Button>
										{imageFieldset.file.dirty && (
											<Button
												variant="outline"
												type="button"
												size="icon"
												className="text-destructive-foreground border-destructive size-8"
												onClick={onReset}
											>
												<X />
											</Button>
										)}
									</div>
								</div>
								<div className="text-muted-foreground">
									File size must not exceed 3MB.
								</div>
							</div>
						</div>
						<ErrorList
							id={imageFieldset.file.errorId}
							errors={imageFieldset.file.errors}
						/>
					</div>
					<ErrorList id={meta.errorId} errors={meta.errors} />
				</fieldset>
			</div>
		</div>
	)
}

function ProfileImage({ previewImage }: { previewImage: string | null }) {
	const className =
		'bg-background text-muted-foreground ring-border ring-1 rounded-md'
	return (
		<div className="relative flex size-24 items-center justify-center">
			{!previewImage ? (
				<div
					className={cn(
						className,
						'flex size-full items-center justify-center',
					)}
				>
					<UserRound className="size-16" />
				</div>
			) : previewImage.startsWith('data:image/') ? (
				<img
					src={previewImage}
					alt="Profile Image"
					className={cn(className, 'size-full object-cover')}
				/>
			) : (
				<Img
					src={previewImage}
					alt="Profile Image"
					className={cn(className, 'size-full object-cover')}
					width={96}
					height={96}
				/>
			)}
		</div>
	)
}

export function OTPField({
	labelProps,
	inputProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	inputProps: Partial<OTPInputProps & { render: never }>
	errors?: ListOfErrors
	className?: string
}) {
	const fallbackId = useId()
	const id = inputProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<div className="flex flex-col items-center gap-2">
				<Label htmlFor={id} {...labelProps} />
				<InputOTP
					pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					maxLength={6}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...inputProps}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</div>
			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	)
}
