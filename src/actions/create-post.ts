'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTopicSchema = z.object({
  title: z
  .string().min(3, {message: "Minimum 3 caractères"}),
  content: z
  .string()
  .min(10, {message: "Minimum 10 caractères"}),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  postImages: string[],
  formState: CreatePostFormState, 
  formData: FormData): 
  Promise<CreatePostFormState> {
  const result = createTopicSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  };

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Vous devez être connecté pour créer un post"]
      }
    }
  };

  const topic = await db.topic.findFirst({
    where: {slug},
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Le sujet n'existe pas"]
      }
    }
  };

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        images: postImages,
        userId: session.user.id,
        topicId: topic.id,
      }
    });
  
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        }
      }
    } else {
      return {
        errors: {
          _form: ["Une erreur est survenue"],
        }
      }
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
  
  //TODO: revalidate topicShow page
}