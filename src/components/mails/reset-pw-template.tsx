

interface  ResetPwMailTemplateProps {
  BASE_URL: string;
  token: string;
  username: string;
}

export default function ResetPwMailTemplate(
  {BASE_URL, token, username}: ResetPwMailTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-start pt-12">
      <div className="w-[95vw] sm:w-[550px] border-1 border-slate-400 text-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl text-center font-bold">Réinitialiser le mot de passe</h1>
          <p className="text-center my-4">
            Bonjour {username}, cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe. Ce lien est valide pendant 1h.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12">
          <a href={`${BASE_URL}/reset-password/${token}`} className="w-1/2 font-medium text-base text-center text-slate-900 bg-slate-50 border-3 border-slate-50 hover:border-slate-400 hover:bg-slate-100 rounded-md p-4">
            Réinitialiser le mot de passe
          </a>
        </div>
      </div>
    </div>
  )
}