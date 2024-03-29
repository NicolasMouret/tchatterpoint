'use server';

import { auth } from "@/auth";
import { db, supabase } from "@/db";
import { revalidatePath } from "next/cache";


export async function editAvatar(
  avatar: string,
) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Vous devez être connecté pour modifier votre avatar");
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
      throw new Error("Une erreur est survenue");
    }
  }

  revalidatePath(`/mon-profil`);
  const channel = supabase.channel(`confirmEditAvatar-${session.user.id}`);
  channel.subscribe(() => {
    channel.send({
      payload: { newAvatar: avatar},
      type: "broadcast",
      event: "confirmEditAvatar",
    })
  })
  return {
    success: true,
  }
}