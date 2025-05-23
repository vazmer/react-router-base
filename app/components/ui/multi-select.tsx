import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronDown, WandSparkles, X } from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-0.5', {
	variants: {
		variant: {
			default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
			secondary:
				'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
			destructive:
				'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
			inverted: 'inverted',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof multiSelectVariants> {
	label?: string

	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label, value, and an optional icon.
	 */
	options: {
		/** The text to display for the option. */
		label: string
		/** The unique value associated with the option. */
		value: string
		/** Optional icon component to display alongside the option. */
		icon?: React.ComponentType<{ className?: string }>
	}[]

	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onValueChange: (value: string[]) => void

	/** The default selected values when the component mounts. */
	defaultValue?: string[]

	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string

	/**
	 * Animation duration in seconds for the visual effects (e.g., bouncing badges).
	 * Optional, defaults to 0 (no animation).
	 */
	animation?: number

	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number

	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean

	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean

	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
	className?: string
}

function MultiSelect({
	options,
	onValueChange,
	variant,
	defaultValue = [],
	placeholder = 'Select options',
	animation = 0,
	maxCount = 3,
	modalPopover = false,
	className,
	label,
	name,
	...props
}: React.ComponentProps<'button'> & MultiSelectProps) {
	const [selectedValues, setSelectedValues] =
		React.useState<string[]>(defaultValue)
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
	const [isAnimating, setIsAnimating] = React.useState(false)

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			setIsPopoverOpen(true)
		} else if (event.key === 'Backspace' && !event.currentTarget.value) {
			const newSelectedValues = [...selectedValues]
			newSelectedValues.pop()
			setSelectedValues(newSelectedValues)
			onValueChange(newSelectedValues)
		}
	}

	const toggleOption = (option: string) => {
		const newSelectedValues = selectedValues.includes(option)
			? selectedValues.filter((value) => value !== option)
			: [...selectedValues, option]
		setSelectedValues(newSelectedValues)
		onValueChange(newSelectedValues)
	}

	const handleClear = () => {
		setSelectedValues([])
		onValueChange([])
	}

	const handleTogglePopover = () => {
		setIsPopoverOpen((prev) => !prev)
	}

	// const clearExtraOptions = () => {
	// 	const newSelectedValues = selectedValues.slice(0, maxCount)
	// 	setSelectedValues(newSelectedValues)
	// 	onValueChange(newSelectedValues)
	// }

	const toggleAll = () => {
		if (selectedValues.length === options.length) {
			handleClear()
		} else {
			const allValues = options.map((option) => option.value)
			setSelectedValues(allValues)
			onValueChange(allValues)
		}
	}

	return (
		<Popover
			open={isPopoverOpen}
			onOpenChange={setIsPopoverOpen}
			modal={modalPopover}
		>
			<PopoverTrigger asChild>
				<Button
					data-slot="button"
					onClick={handleTogglePopover}
					className={cn(
						"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent p-2 text-sm font-normal whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none hover:bg-inherit focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-auto [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
						className,
					)}
					{...props}
				>
					{selectedValues.length > 0 ? (
						<div className="flex w-full items-center justify-between gap-2">
							<div className="flex flex-wrap items-center">
								{label && (
									<span className="text-muted-foreground">{label}</span>
								)}
								{selectedValues.slice(0, maxCount).map((value) => {
									const option = options.find((o) => o.value === value)
									const IconComponent = option?.icon
									return (
										<Badge
											key={value}
											className={cn(
												isAnimating ? 'animate-bounce' : '',
												multiSelectVariants({ variant }),
											)}
											style={{ animationDuration: `${animation}s` }}
										>
											{IconComponent && <IconComponent className="size-4" />}
											{option?.label}
											{/*<XCircle*/}
											{/*	className="ml-1 size-4 cursor-pointer"*/}
											{/*	onClick={(event) => {*/}
											{/*		event.stopPropagation()*/}
											{/*		toggleOption(value)*/}
											{/*	}}*/}
											{/*/>*/}
										</Badge>
									)
								})}
								{selectedValues.length > maxCount && (
									<Badge
										className={cn(
											'text-foreground border-foreground/1 bg-transparent hover:bg-transparent',
											isAnimating ? 'animate-bounce' : '',
											multiSelectVariants({ variant }),
										)}
										style={{ animationDuration: `${animation}s` }}
									>
										{`+ ${selectedValues.length - maxCount} more`}
										{/*<XCircle*/}
										{/*	className="size-4 cursor-pointer"*/}
										{/*	onClick={(event) => {*/}
										{/*		event.stopPropagation()*/}
										{/*		clearExtraOptions()*/}
										{/*	}}*/}
										{/*/>*/}
									</Badge>
								)}
							</div>
							<div className="flex items-center justify-between gap-1.5">
								<X
									className="text-muted bg-muted-foreground size-3 cursor-pointer rounded-full opacity-70 transition-opacity hover:opacity-100"
									onClick={(event) => {
										event.stopPropagation()
										handleClear()
									}}
								/>
								<Separator
									orientation="vertical"
									className="flex h-full min-h-6"
								/>
								<ChevronDown className="text-muted-foreground h-4 cursor-pointer" />
							</div>
						</div>
					) : (
						<div className="mx-auto flex w-full items-center justify-between gap-2">
							<span className="text-muted-foreground text-sm">
								{placeholder}
							</span>
							<ChevronDown className="text-muted-foreground h-4 cursor-pointer" />
						</div>
					)}
					{selectedValues.map((value) => (
						<input key={value} name={name} value={value} type="hidden" />
					))}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start"
				onEscapeKeyDown={() => setIsPopoverOpen(false)}
			>
				<Command>
					<CommandInput
						placeholder="Search..."
						onKeyDown={handleInputKeyDown}
					/>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							<CommandItem
								key="all"
								onSelect={toggleAll}
								className="cursor-pointer"
							>
								<div
									className={cn(
										'border-primary flex size-4 items-center justify-center rounded-sm border',
										selectedValues.length === options.length
											? 'bg-primary text-primary-foreground'
											: 'opacity-50 [&_svg]:invisible',
									)}
								>
									<CheckIcon className="size-4" />
								</div>
								<span>Select All</span>
							</CommandItem>
							<CommandSeparator />
							{options.map((option) => {
								const isSelected = selectedValues.includes(option.value)
								return (
									<CommandItem
										key={option.value}
										onSelect={() => toggleOption(option.value)}
										className="cursor-pointer"
									>
										<div
											className={cn(
												'border-primary flex size-4 items-center justify-center rounded-sm border',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible',
											)}
										>
											<CheckIcon className="size-4" />
										</div>
										{option.icon && (
											<option.icon className="text-muted-foreground mr-1 size-4" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								)
							})}
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup>
							<div className="flex items-center justify-between">
								{selectedValues.length > 0 && (
									<>
										<CommandItem
											onSelect={handleClear}
											className="flex-1 cursor-pointer justify-center"
										>
											Clear
										</CommandItem>
										<Separator
											orientation="vertical"
											className="flex h-full min-h-6"
										/>
									</>
								)}
								<CommandItem
									onSelect={() => setIsPopoverOpen(false)}
									className="max-w-full flex-1 cursor-pointer justify-center"
								>
									Close
								</CommandItem>
							</div>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
			{animation > 0 && selectedValues.length > 0 && (
				<WandSparkles
					className={cn(
						'text-foreground bg-background my-2 h-3 w-3 cursor-pointer',
						isAnimating ? '' : 'text-muted-foreground',
					)}
					onClick={() => setIsAnimating(!isAnimating)}
				/>
			)}
		</Popover>
	)
}

export { MultiSelect }
