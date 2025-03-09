import { OpenImgContextProvider } from 'openimg/react'
import React from 'react'
import {
	data,
	type HeadersFunction,
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
import { useToast } from '@/components/toaster.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { useTheme } from '@/routes/resources+/theme-switch.tsx'
import { getUserId, logout } from '@/utils/auth.server.ts'
import { ClientHintCheck, getHints } from '@/utils/client-hints.tsx'
import { prisma } from '@/utils/db.server.ts'
import { getEnv } from '@/utils/env.server.ts'
import { honeypot } from '@/utils/honeypot.server.ts'
import { i18n } from '@/utils/i18n'
import { i18next } from '@/utils/i18next.server.ts'
import { combineHeaders, getImgSrc } from '@/utils/misc.tsx'
import { useNonce } from '@/utils/nonce-provider.ts'
import { getTheme } from '@/utils/theme.server.ts'
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
	const locale = await i18next.getLocale(request)

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

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	const headers = {
		'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
	}
	return headers
}

export const meta: Route.MetaFunction = ({ data }) => {
	return [
		{ title: data ? 'App' : 'Error | App' },
		{ name: 'description', content: `Your own captain's log` },
	]
}

export function Layout({ children }: { children: React.ReactNode }) {
	// if there was an error running the loader, data could be missing
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const { locale } = data.requestInfo
	useChangeLanguage(locale)
	const theme = useTheme()
	useToast(data.toast)

	return (
		<html
			lang={data.requestInfo.locale || i18n.fallbackLng}
			className={`${theme} light h-full overflow-x-hidden`}
		>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{data?.ENV.ALLOW_INDEXING ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<Toaster closeButton position="top-center" theme={theme} />
			</body>
		</html>
	)
}

export default function App({ loaderData }: Route.ComponentProps) {
	return (
		<HoneypotProvider {...loaderData.honeyProps}>
			<OpenImgContextProvider
				optimizerEndpoint="/resources/images"
				getSrc={getImgSrc}
			>
				<Outlet />
			</OpenImgContextProvider>
		</HoneypotProvider>
	)
}

// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
export const ErrorBoundary = GeneralErrorBoundary
