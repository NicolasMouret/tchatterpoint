'use server';

import { auth } from "@/auth";
import { db, supabase } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

const editUser = z.object({
  name: z.string().min(3, { message: "Minimum 3 caractères" }),
  biography: z.string().max(300, { message: "Maximum 300 caractères" }),
})

interface EditUserInfosFormState {
  errors: {
    name?: string[];
    biography?: string[];
    _form?: string[];
  };
}

export async function editUserInfos(
  isMailPublic: boolean,
  formState: EditUserInfosFormState,
  formData: FormData,
): Promise<EditUserInfosFormState> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Vous devez vous connecter pour effectuer cette action.");
  }

  const result = editUser.safeParse({
    name: formData.get('name'),
    biography: formData.get('biography'),
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
        biography: result.data.biography,
        mailIsPublic: isMailPublic,
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
  const channel = supabase.channel(`confirmEdit-${session.user.id}`);
  channel.subscribe(() => {
    channel.send({
      type: "broadcast",
      event: "confirmEdit",
    })
  })
  return {
    errors: {},
  }
}