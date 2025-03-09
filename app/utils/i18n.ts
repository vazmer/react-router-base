import { sr, enGB } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

export const i18n = {
	// This is the list of languages your application supports
	supportedLngs: ['en', 'sr'],
	// This is the language you want to use in case
	// if the user language is not in the supportedLngs
	fallbackLng: 'en',
	// The default namespace of i18next is "translation", but you can customize it here
	defaultNS: 'common',
	// Disabling suspense is recommended
	react: { useSuspense: true },
}

export function useDateFnsLocale() {
	const { i18n } = useTranslation()
	switch (i18n.language) {
		case 'en':
			return enGB
		case 'sr':
			return sr
		default:
			return enGB
	}
}
