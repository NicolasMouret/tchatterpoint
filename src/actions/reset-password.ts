'use server';

import { db } from '@/db';
import { hash } from 'bcrypt';
import { z } from 'zod';

const resetPasswordUser = z.object({
  password: z.string().min(12, { message: "Minimum 12 caractères" }),
  confirmPassword: z.string().min(12, { message: "Minimum 12 caractères" }),
}).refine((values) => {
  return values.password === values.confirmPassword;
},
{
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

interface ResetPasswordFormState {
  successMessage?: string;
  errors: {
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
}

export async function resetPassword(
  token: string,
  formState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const result = resetPasswordUser.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  };

  const passwordResetToken = await db.passwordResetToken.findUnique({
    where: {
      token: token,
      createdAt: {gt: new Date(Date.now() - 1000 * 60 * 60)},
      resetAt: null,
    },
  });

  if (!passwordResetToken) {
    return {
      errors: {
        _form: ["Le lien n'est plus valide"],
      },
    };
  }

  const pwHash = await hash(result.data.password, 10);
  const updateUser = db.user.update({
    where: {
      id: passwordResetToken.userId,
    },
    data: {
      pwHash: pwHash,
    },
  });
  const updateToken = db.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });
  
  try {
    await db.$transaction([updateUser, updateToken]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Une erreur est survenue"],
        },
      };
    }
  }
  return {
    successMessage: "Mot de passe réinitialisé",
    errors: {},
  }
}