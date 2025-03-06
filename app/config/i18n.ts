import en from '@/locales/en'
import sr from '@/locales/sr'

// This is the list of languages your application supports
export const supportedLngs = ['en', 'sr']

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = 'en'

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = 'common'

export const resources = {
	en: { common: en },
	sr: { common: sr },
}
