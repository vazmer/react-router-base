import { invariant } from '@epic-web/invariant'
import { redirect, type ActionFunctionArgs, data } from 'react-router'
import { i18nCookie } from '@/utils/i18next.server.ts'

export async function loader() {
	return redirect('/')
}

export async function action({ params }: ActionFunctionArgs) {
	const { lang } = params
	invariant(lang, 'lang is required')
	return data(null, {
		headers: {
			'set-cookie': await i18nCookie.serialize(lang),
		},
	})
}
