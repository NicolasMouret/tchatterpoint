'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(3, { message: "Minimum 3 caractères" }),
});

interface EditCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function editComment(
  { commentId, postId, images }: { 
    commentId: string, 
    postId: string,
    images: string[]
  }, 
  formState: EditCommentFormState,
  formData: FormData
  ): Promise<EditCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Vous devez être connecté pour modifier un commentaire"],
      },
    };
  }

  try {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: result.data.content,
        images: images,
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