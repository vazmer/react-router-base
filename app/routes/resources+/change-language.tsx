import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { Languages } from 'lucide-react'
import React, { useRef, useState } from 'react'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'
import {
	data,
	redirect,
	useActionData,
	useFetcher,
	useSubmit,
} from 'react-router'
import { z } from 'zod'
import { type Route } from './+types/change-language.ts'
import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { LngSchema } from '@/utils/i18n.ts'
import { i18nCookie } from '@/utils/i18next.server.ts'
import { useRequestInfo } from '@/utils/request-info.ts'

const ChangeLanguageSchema = z.object({
	lng: LngSchema,
	// this is useful for progressive enhancement
	redirectTo: z.string().optional(),
})

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ChangeLanguageSchema,
	})

	invariantResponse(
		submission.status === 'success',
		`Invalid language received`,
	)

	const { lng, redirectTo } = submission.value

	const responseInit = {
		headers: { 'set-cookie': await i18nCookie.serialize(lng) },
	}
	if (redirectTo) {
		return redirect(redirectTo, responseInit)
	} else {
		return data({ result: submission.reply() }, responseInit)
	}
}

export function LanguageDropDown() {
	const requestInfo = useRequestInfo()
	const actionData = useActionData<typeof action>()
	const fetcher = useFetcher<typeof action>()
	const formRef = useRef<HTMLFormElement>(null)
	const submit = useSubmit()
	const { t, i18n } = useTranslation()

	const [form, fields] = useForm({
		id: 'change-language',
		defaultValue: { lng: requestInfo.locale, redirectTo: requestInfo.path },
		constraint: getZodConstraint(ChangeLanguageSchema),
		lastResult: actionData?.result,
	})

	const handleFormChange = async (lng: LngSchema) => {
		setSelectedLanguage(lng)
		await i18n.changeLanguage(lng)
		await submit(formRef.current)
	}

	const [selectedLanguage, setSelectedLanguage] = useState<LngSchema>(
		requestInfo.locale,
	)

	return (
		<fetcher.Form
			ref={formRef}
			method="POST"
			action="/resources/change-language"
			{...getFormProps(form)}
		>
			<input
				name={fields.redirectTo.name}
				value={requestInfo.path}
				type="hidden"
			/>
			<input name={fields.lng.name} value={selectedLanguage} type="hidden" />
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
						value={selectedLanguage}
						onValueChange={(lng) => handleFormChange(lng as LngSchema)}
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
		</fetcher.Form>
	)
}
