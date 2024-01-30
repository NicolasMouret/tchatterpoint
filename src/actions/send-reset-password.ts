'use server';

import ResetPwMailTemplate from '@/components/mails/reset-pw-template';
import { db } from '@/db';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
if (!resend) {
  throw new Error("Missing RESEND_API_KEY env var");
}

const sendResetPwMailUser = z.object({
  email: z.string().email(),
})

interface SendResetPwMailFormState {
  successMessage?: string;
  errors: {
    email?: string[];
    _form?: string[];
  };
}

export async function sendResetPwMail(
  formState: SendResetPwMailFormState,
  formData: FormData,
): Promise<SendResetPwMailFormState> {
  const result = sendResetPwMailUser.safeParse({
    email: formData.get('email'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  };

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (!user) {
    return {
      errors: {
        _form: ["Aucun utilisateur n'a été trouvé avec cet email"],
      },
    };
  }

  const token = await db.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, ''),
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL;
  if (!baseUrl) {
    throw new Error("Missing BASE_URL env var");
  }

  try {
    const data = await resend.emails.send({
      from: "Tchatterpoint <contact@tchatterpoint.fr>",
      to: user.email!,
      subject: "Réinitialisation du mot de passe",
      react: ResetPwMailTemplate({
        username: user.name,
        token: token.token,
        BASE_URL: baseUrl,
      })
    });
  } catch (err) {
    console.error(err);
    return {
      errors: {
        _form: ["Une erreur est survenue"],
      },
    };
  }
  return {
    successMessage: "Email envoyé",
    errors: {},
  }
}