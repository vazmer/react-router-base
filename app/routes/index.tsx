import {
	Construction,
	LogIn,
	LogOut,
	ShieldAlert,
	Terminal,
} from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Link } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import { useOptionalUser } from '@/utils/user.ts'

export const loader = async () => {
	return {}
}

export default function Index() {
	const { t } = useTranslation()
	const user = useOptionalUser()
	const isAdmin = user?.roles.some((role) => role.name === 'admin')
	return (
		<div className="bg-background flex size-full flex-col items-center justify-center">
			<div className="container flex w-full flex-col items-center gap-10 p-8">
				<h1 className="inline-flex items-center gap-6 text-6xl font-bold max-sm:gap-4 max-sm:text-4xl">
					<Construction className="size-14" aria-hidden />
					Under Construction
				</h1>
				<div className="text-muted-foreground text-center">
					<div className="flex flex-col gap-4">
						<div>
							<b>RrApp</b> is under construction. We'll be back with a working
							public presentation soon.
						</div>
						<div>
							Follow us on Github{' '}
							<Link
								className="font-medium text-blue-500 hover:underline"
								to="https://github.com/vazmer/react-router-base"
								target="_blank"
							>
								repository
							</Link>{' '}
							for updates.{' '}
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					{isAdmin && (
						<Link
							to="/admin"
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'cursor-default',
							)}
							prefetch="intent"
						>
							<ShieldAlert />
							{t('index.goToAdmin')}
						</Link>
					)}
					{user && (
						<Form action="/logout" method="POST">
							<Button type="submit" variant="ghost">
								<LogOut />
								{t('index.logout')}
							</Button>
						</Form>
					)}
					{!user && (
						<div className="flex flex-col justify-center gap-3">
							<Alert>
								<Terminal className="size-4" />
								<AlertTitle>Try it out!</AlertTitle>
								<AlertDescription>
									<p>
										Login using{' '}
										<code className="bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
											admin
										</code>
										{' / '}
										<code className="bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
											admin1234
										</code>{' '}
										to have a sneak peek at the administrative part of the app.
									</p>
								</AlertDescription>
							</Alert>
							<Link
								to="/login"
								className={cn(
									buttonVariants({ variant: 'ghost' }),
									'cursor-default',
								)}
							>
								<LogIn />
								{t('index.login')}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
