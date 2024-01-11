'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

const editPseudoUser = z.object({
  name: z.string().min(3, { message: "Minimum 3 caractères" }),
})

interface EditPseudoFormState {
  errors: {
    name?: string[];
    _form?: string[];
  };
}

export async function editPseudo(
  formState: EditPseudoFormState,
  formData: FormData,
): Promise<EditPseudoFormState> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Vous devez vous connecter pour effectuer cette action.");
  }

  const result = editPseudoUser.safeParse({
    name: formData.get('name'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  };

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: result.data.name,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
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

  revalidatePath(`/mon-profil`);
  return {
    errors: {},
  }
}