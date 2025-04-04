import React from 'react'
import { Separator } from '@/components/ui/separator.tsx'

export function AppIntro() {
	return (
		<div className="m-2 flex rounded-4xl bg-gray-900 p-[10%] ring-10 ring-white/20 max-lg:hidden lg:mt-[10%] lg:mr-[30%] lg:mb-[-5%]">
			<div className="flex flex-col gap-10 text-sm text-gray-300">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
					{ENV.APP_NAME}
				</h1>
				<p className="text-gray-400">
					An advanced React router app built on top of the Epic Web stack
					following latest technologies and trends.
				</p>
				<ul className="flex flex-col gap-3 max-md:hidden">
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-sky-500">
								@Tailwind
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Built with accessibility in mind with the help of{' '}
							<code className="font-mono font-medium text-amber-300">
								@RadixUI
							</code>{' '}
							and{' '}
							<code className="font-mono font-medium text-amber-300">
								@ShadCN
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Deployed automatically at{' '}
							<code className="font-mono font-medium text-fuchsia-600">
								@fly
							</code>{' '}
							triggered by{' '}
							<code className="font-mono font-medium text-amber-300">
								@Github
							</code>{' '}
							actions
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-amber-300">
								@i18n
							</code>{' '}
							implemented from the start currently supporting Serbian and
							English. Any language can be quickly added.
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							<code className="font-mono font-medium text-emerald-500">
								@Prisma
							</code>{' '}
							and{' '}
							<code className="font-mono font-medium text-blue-500">
								@PostgreSQL
							</code>{' '}
							for saving data and ORM
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Files storage at{' '}
							<code className="font-mono font-medium text-green-500">
								@Tigris
							</code>
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">
							Light and dark mode with an automatic detecton of user's system
							preference
						</p>
					</li>
					<li className="flex">
						<CheckItem />
						<p className="ml-3">... and many more.</p>
					</li>
				</ul>
				<p className="text-gray-400 max-md:hidden">
					Perfect for learning how the framework works, or starting a new
					project in no-time.
				</p>
				<Separator className="bg-gray-600" />
				<p className="text-muted-foreground">
					Check the Github{' '}
					<a
						className="font-medium text-blue-500 hover:underline"
						href="https://github.com/vazmer/react-router-base/"
						target="_blank"
						rel="noopener noreferrer"
					>
						repository
					</a>{' '}
					for more details.
				</p>
			</div>
		</div>
	)
}

function CheckItem() {
	return (
		<svg
			className="h-[1lh] w-5.5 shrink-0"
			viewBox="0 0 22 22"
			fill="none"
			strokeLinecap="square"
		>
			<circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
			<circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
			<path
				d="M8 11.5L10.5 14L14 8"
				className="stroke-sky-800 dark:stroke-sky-300"
			/>
		</svg>
	)
}
