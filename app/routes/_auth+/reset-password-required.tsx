import { AlertCircle } from 'lucide-react'
import { type Route } from './+types/reset-password.ts'
import { Alert, AlertDescription } from '@/components/ui/alert.tsx'
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
				description={`Hi, ${loaderData.resetPasswordUsername}.`}
			>
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Your password has been recently updated by administrator. For
						security reasons, you are required to changed it on next login.
					</AlertDescription>
				</Alert>
				<ResetPasswordForm />
			</AuthCard>
		</div>
	)
}
