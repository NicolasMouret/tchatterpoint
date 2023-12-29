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
        _form: ["You must sign in to do this."],
      }
    };
  }

  if (!location) {
    return {
      errors: {
        _form: ["The location you entered was invalid."],
      }
    };
  }

  try {
    console.log("Before update:", session.user);
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
          _form: ["Something went wrong..."],
        },
      };
    }
  }
  revalidatePath("/ma-position")
  return {
    success: true,
    errors: {},
  }
}