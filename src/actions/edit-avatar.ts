'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";


export async function editAvatar(
  avatar: string,
) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("You must sign in to do this.");
  }

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: avatar,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Something went wrong...");
    }
  }

  revalidatePath(`/mon-profil`);
  return {
    success: true,
  }
}