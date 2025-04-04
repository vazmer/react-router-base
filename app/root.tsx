import { OpenImgContextProvider } from 'openimg/react'
import React from 'react'
import {
	data,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from 'react-router'

import { useChangeLanguage } from 'remix-i18next/react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { type Route } from './+types/root.ts'
import { GeneralErrorBoundary } from '@/components/error-boundary.tsx'

import './tailwind.css'
import { Progress } from '@/components/progress.tsx'
import { useToast } from '@/components/toaster.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'
import {
	useOptionalTheme,
	useTheme,
} from '@/routes/resources+/theme-switch.tsx'
import { getUserId, logout } from '@/utils/auth.server.ts'
import { ClientHintCheck, getHints } from '@/utils/client-hints.tsx'
import { prisma } from '@/utils/db.server.ts'
import { getEnv } from '@/utils/env.server.ts'
import { pipeHeaders } from '@/utils/headers.server.ts'
import { honeypot } from '@/utils/honeypot.server.ts'
import { i18n, type LngSchema } from '@/utils/i18n'
import { i18next } from '@/utils/i18next.server.ts'
import { combineHeaders, getImgSrc } from '@/utils/misc.tsx'
import { useNonce } from '@/utils/nonce-provider.ts'
import { getTheme, type Theme } from '@/utils/theme.server.ts'
import { makeTimings, time } from '@/utils/timing.server.ts'
import { getToast } from '@/utils/toast.server.ts'

export async function loader({ request }: Route.LoaderArgs) {
	const timings = makeTimings('root loader')
	const userId = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(
				() =>
					prisma.user.findUnique({
						select: {
							id: true,
							name: true,
							username: true,
							email: true,
							image: { select: { objectKey: true } },
							roles: {
								select: {
									name: true,
									permissions: {
										select: { entity: true, action: true, access: true },
									},
								},
							},
						},
						where: { id: userId },
					}),
				{ timings, type: 'find user', desc: 'find user in root' },
			)
		: null

	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}

	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = await honeypot.getInputProps()
	const locale = (await i18next.getLocale(request)) as LngSchema

	return data(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				path: new URL(request.url).pathname,
				locale,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			toast,
			ENV: getEnv(),
			honeyProps,
		},
		{
			headers: combineHeaders(
				{
					'Server-Timing': timings.toString(),
				},
				toastHeaders,
			),
		},
	)
}

export const handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: ['common'],
}

export const meta: Route.MetaFunction = ({ data }) => {
	return [
		{ title: data ? ENV.APP_NAME : `Error | ${ENV.APP_NAME}` },
		{ name: 'description', content: `React router app` },
	]
}

export const headers: Route.HeadersFunction = pipeHeaders

function Document({
	children,
	nonce,
	theme = ENV.FALLBACK_THEME,
	locale = i18n.fallbackLng,
	env = {},
}: {
	nonce: string
	theme?: Theme
	locale?: string
	env?: Record<string, string | undefined>
} & React.ComponentProps<'html'>) {
	const allowIndexing = ENV.ALLOW_INDEXING !== 'false'

	return (
		<html lang={locale} className={`${theme} h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground h-full">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	// if there was an error running the loader, data could be missing
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const { locale } = data.requestInfo
	const theme = useOptionalTheme()

	return (
		<Document nonce={nonce} theme={theme} env={data?.ENV} locale={locale}>
			{children}
		</Document>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const { locale } = data.requestInfo
	const theme = useTheme()
	useChangeLanguage(locale)
	useToast(data.toast)
	return (
		<OpenImgContextProvider
			optimizerEndpoint="/resources/images"
			getSrc={getImgSrc}
		>
			<TooltipProvider>
				<Outlet />
				<Toaster closeButton position="top-center" theme={theme} />
				<Progress />
			</TooltipProvider>
		</OpenImgContextProvider>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export default AppWithProviders

// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
export const ErrorBoundary = GeneralErrorBoundary
