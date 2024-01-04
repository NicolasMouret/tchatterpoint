'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { hash } from 'bcrypt';
import { z } from 'zod';

const signUpUser = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(12),
  confirmPassword: z.string().min(12),
}).refine((values) => {
  return values.password === values.confirmPassword;
},
{
  message: "Passwords must match!",
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
      },
    });

    const session = await auth();
    if (session && session.user) {
      return {
        errors: {},
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return {
        errors: {
          _form: ["Cette email est déjà utilisé"],
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

  return {
    errors: {},
  };
}