import { Languages } from 'lucide-react'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'
import { useSubmit } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

function LanguageDropDown() {
	const { t, i18n } = useTranslation()
	const submit = useSubmit()

	const onValueChange = async (lang: string) => {
		await Promise.all([
			i18n.changeLanguage(lang),
			submit(null, {
				method: 'POST',
				action: `/settings/change-language/${lang}`,
			}),
		])
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-8 justify-center gap-1.5 px-1 text-xs"
				>
					<Languages />
					{t(`root.${i18n.language}`)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={i18n.language}
					onValueChange={onValueChange}
				>
					<DropdownMenuRadioItem value="sr">
						<Flag country="RS" size={20} />
						{t('root.sr', { lng: 'sr' })}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="en">
						<Flag country="GB" size={20} />
						{t('root.en', { lng: 'en' })}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { LanguageDropDown }
