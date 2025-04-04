import { type Route } from './+types/reset-password.ts'
import { AuthCard } from '@/routes/_auth+/__auth-card.tsx'
import { ResetPasswordForm } from '@/routes/_auth+/reset-password.tsx'

export { loader, action, meta } from './reset-password.tsx'

export default function ResetPasswordPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="container">
			<AuthCard
				title="Password Reset Required"
				description={`Hi, ${loaderData.resetPasswordUsername}. Your password has been recently updated by administrator. For security reasons, you are required to changed it on first login.`}
			>
				<ResetPasswordForm />
			</AuthCard>
		</div>
	)
}
