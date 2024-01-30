import ResetPasswordForm from "@/components/sign-up-in-out/reset-password";

interface ForgotPasswordPageProps {
  params: {
    token: string
  }
}

export default function ForgotPasswordPage({params}: ForgotPasswordPageProps) {
  const token = params.token;
  return (
    <div className="flex flex-col items-center justify-start pt-12">
      <ResetPasswordForm token={token}/>
    </div>
  )
}