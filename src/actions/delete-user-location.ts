'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface DeleteUserLocationFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteUserLocation(
  formState: DeleteUserLocationFormState
): Promise<DeleteUserLocationFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Vous devez être connecté pour supprimer votre position"],
      },
    };
  }

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        latitude: null,
        longitude: null,
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

  revalidatePath(`/ma-position`);
  return {
    errors: {},
    success: true,
  };
}