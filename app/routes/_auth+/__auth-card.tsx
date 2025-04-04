import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card.tsx'

export function AuthCard({
	title,
	description,
	includeAppName = true,
	children,
}: {
	title: React.ReactNode
	includeAppName?: boolean
	description?: React.ReactNode
} & React.ComponentProps<'div'>) {
	return (
		<div className="flex size-full items-center justify-center self-center">
			<div className="w-full max-w-lg">
				<div className="flex flex-col justify-center gap-10 max-sm:gap-6">
					{includeAppName && (
						<div className="self-center text-4xl text-white underline underline-offset-4 max-sm:text-3xl">
							{ENV.APP_NAME}
						</div>
					)}
					<Card className="ring-3 ring-white/20 md:p-10">
						<CardHeader>
							<CardTitle>
								<h1 className="text-2xl">{title}</h1>
							</CardTitle>
							{description && <CardDescription>{description}</CardDescription>}
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							{children}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
