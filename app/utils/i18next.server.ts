import { resolve } from 'node:path'
import { enGB, sr } from 'date-fns/locale'
import Backend from 'i18next-fs-backend/cjs'
import { createCookie } from 'react-router'
import { RemixI18Next } from 'remix-i18next/server'
import { i18n } from '@/utils/i18n.ts'

export const i18nCookie = createCookie('en_lang', {
	sameSite: 'lax',
	path: '/',
	secure: process.env.NODE_ENV === 'production',
	httpOnly: true,
})

export const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
		cookie: i18nCookie,
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18n,
		backend: {
			loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
		},
	},
	plugins: [Backend],
})

export async function getDateFnsLocale(request: Request) {
	const locale = await i18next.getLocale(request)
	switch (locale) {
		case 'en':
			return enGB
		case 'sr':
			return sr
		default:
			return enGB
	}
}
