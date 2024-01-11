'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

interface DeleteCommentFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteComment(
  { commentId, postId }: { commentId: string, postId: string }, 
  formState: DeleteCommentFormState
  ): Promise<DeleteCommentFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Vous devez être connecté pour supprimer un commentaire"],
      },
    };
  }

  try {
    await db.comment.delete({
      where: {
        id: commentId,
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

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Le sujet n'existe pas"],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));

  return {
    errors: {},
    success: true,
  };
  
}