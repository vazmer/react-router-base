import { sr, enGB } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

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
