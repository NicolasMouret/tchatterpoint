'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface UpdateUserLocationResult {
  errors: {
    _form?: string[];
  };
  success?: boolean;
  updatedLocation?: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export async function updateUserLocation(
  location : google.maps.LatLngLiteral | null,
  formState: UpdateUserLocationResult,
  formData: FormData
): Promise<UpdateUserLocationResult> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Vous devez être connecté pour modifier votre position"],
      }
    };
  }

  if (!location) {
    return {
      errors: {
        _form: ["La position n'est pas valide"],
      }
    };
  }

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        latitude: location.lat as number,
        longitude: location.lng as number,
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
  revalidatePath("/ma-position")
  revalidatePath("/carte-des-joueurs")
  return {
    success: true,
    errors: {},
  }
}