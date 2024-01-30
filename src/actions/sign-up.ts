'use server';

import * as auth from '@/auth';
import { db } from '@/db';
import { hash } from 'bcrypt';
import { z } from 'zod';

const signUpUser = z.object({
  name: z.string().min(3, { message: "Minimum 3 caractères" }),
  email: z.string().email(),
  password: z.string().min(12, { message: "Minimum 12 caractères" }),
  confirmPassword: z.string().min(12, { message: "Minimum 12 caractères" }),
}).refine((values) => {
  return values.password === values.confirmPassword;
},
{
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

interface SignUpFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
}

export async function signUp(
  formState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const result = signUpUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  };

  const pwHash = await hash(result.data.password, 10);

  try {
    const user = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        pwHash: pwHash,
        image: "/default-avatar.webp",
        biography: "Pas encore de présentation",
      },
    });

  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return {
        errors: {
          email: ["Cette email est déjà utilisé"],
        },
      };
    }
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Une erreur inconnue est survenue"],
        },
      };
    }
  }
  await auth.signIn('credentials', {
    email: result.data.email,
    password: result.data.password,
    redirect: true,
    redirectTo: '/mon-profil',
  });
  return {
    errors: {},
  };
}