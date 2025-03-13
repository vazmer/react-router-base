import { z } from 'zod'

export const i18n = {
	// This is the list of languages your application supports
	supportedLngs: ['sr', 'en'] as const,
	// This is the language you want to use in case
	// if the user language is not in the supportedLngs
	fallbackLng: 'en',
	// The default namespace of i18next is "translation", but you can customize it here
	defaultNS: 'common',
	// Disabling suspense is recommended
	react: { useSuspense: false },
}

export const LngSchema = z.enum(i18n.supportedLngs).default('en')

export type LngSchema = z.infer<typeof LngSchema>
