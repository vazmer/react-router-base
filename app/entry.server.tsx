import { resolve } from 'node:path'
import { PassThrough } from 'node:stream'
import { styleText } from 'node:util'
import { contentSecurity } from '@nichtsam/helmet/content'
import { createReadableStreamFromReadable } from '@react-router/node'
import { createInstance } from 'i18next'
import FSBackend from 'i18next-fs-backend/cjs'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import {
	ServerRouter,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	type HandleDocumentRequestFunction,
} from 'react-router'
import { getEnv, init } from './utils/env.server.ts'
import { NonceProvider } from './utils/nonce-provider.ts'
import { makeTimings } from './utils/timing.server.ts'
import { i18n } from '@/utils/i18n.ts'
import { i18next } from '@/utils/i18next.server.ts'

export const streamTimeout = 5000

init()
global.ENV = getEnv()

const MODE = process.env.NODE_ENV ?? 'development'

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export default async function handleRequest(...args: DocRequestArgs) {
	const [
		request,
		responseStatusCode,
		responseHeaders,
		reactRouterContext,
		loadContext,
	] = args
	// const { currentInstance, primaryInstance } = await getInstanceInfo()
	responseHeaders.set('fly-region', process.env.FLY_REGION ?? 'unknown')
	responseHeaders.set('fly-app', process.env.FLY_APP_NAME ?? 'unknown')
	// responseHeaders.set('fly-primary-instance', primaryInstance)
	// responseHeaders.set('fly-instance', currentInstance)

	// if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
	// 	responseHeaders.append('Document-Policy', 'js-profiling')
	// }

	const callbackName = isbot(request.headers.get('user-agent'))
		? 'onAllReady'
		: 'onShellReady'

	// First, we create a new instance of i18next so every request will have a
	// completely unique instance and not share any state
	const i18nInstance = createInstance()
	// Then we could detect locale from the request
	let lng = await i18next.getLocale(request)
	// And here we detect what namespaces the routes about to render want to use
	let ns = i18next.getRouteNamespaces(reactRouterContext)

	await i18nInstance
		.use(initReactI18next)
		.use(FSBackend)
		.init({
			...i18n,
			lng,
			ns,
			backend: {
				loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
			},
		})

	const nonce = loadContext.cspNonce?.toString() ?? ''
	return new Promise(async (resolve, reject) => {
		let didError = false
		// NOTE: this timing will only include things that are rendered in the shell
		// and will not include suspended components and deferred loaders
		const timings = makeTimings('render', 'renderToPipeableStream')

		const { pipe, abort } = renderToPipeableStream(
			<NonceProvider value={nonce}>
				<I18nextProvider i18n={i18nInstance}>
					<ServerRouter
						nonce={nonce}
						context={reactRouterContext}
						url={request.url}
					/>
				</I18nextProvider>
			</NonceProvider>,
			{
				[callbackName]: () => {
					const body = new PassThrough()
					responseHeaders.set('Content-Type', 'text/html')
					responseHeaders.append('Server-Timing', timings.toString())

					contentSecurity(responseHeaders, {
						crossOriginEmbedderPolicy: false,
						contentSecurityPolicy: {
							// NOTE: Remove reportOnly when you're ready to enforce this CSP
							reportOnly: true,
							directives: {
								fetch: {
									'connect-src': [
										MODE === 'development' ? 'ws:' : undefined,
										process.env.SENTRY_DSN ? '*.sentry.io' : undefined,
										"'self'",
									],
									'font-src': ["'self'"],
									'frame-src': ["'self'"],
									'img-src': ["'self'", 'data:'],
									'script-src': [
										"'strict-dynamic'",
										"'self'",
										`'nonce-${nonce}'`,
									],
									'script-src-attr': [`'nonce-${nonce}'`],
								},
							},
						},
					})

					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					)
					pipe(body)
				},
				onShellError: (err: unknown) => {
					reject(err)
				},
				onError: () => {
					didError = true
				},
				nonce,
			},
		)

		setTimeout(abort, streamTimeout + 5000)
	})
}

export async function handleDataRequest(response: Response) {
	// const { currentInstance, primaryInstance } = await getInstanceInfo()
	response.headers.set('fly-region', process.env.FLY_REGION ?? 'unknown')
	response.headers.set('fly-app', process.env.FLY_APP_NAME ?? 'unknown')
	// response.headers.set('fly-primary-instance', primaryInstance)
	// response.headers.set('fly-instance', currentInstance)

	return response
}

export function handleError(
	error: unknown,
	{ request }: LoaderFunctionArgs | ActionFunctionArgs,
): void {
	// Skip capturing if the request is aborted as Remix docs suggest
	// Ref: https://remix.run/docs/en/main/file-conventions/entry.server#handleerror
	if (request.signal.aborted) {
		return
	}
	if (error instanceof Error) {
		console.error(styleText('red', String(error.stack)))
		// void Sentry.captureException(error)
	} else {
		console.error(error)
		// Sentry.captureException(error)
	}
}
