'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import type { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
  .string().min(3, {message: "Minimum 3 caractères"})
  .regex(/[a-z-]/, { 
    message: "Doit contenir uniquement des lettres minuscules et des tirets"
  }),
  description: z
  .string()
  .min(10, {message: "Minimum 10 caractères"}),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}



export async function createTopic(
  formState: CreateTopicFormState, 
  formData: FormData): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
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
        _form: ["Vous devez être connecté pour créer un topic"]
      }
    }
  };

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },    
    })
  } catch (err:unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        }
      }
    }
    return {
      errors: {
        _form: ["Une erreur est survenue"],
      }
    }
  }

  revalidatePath('/cantina');
  redirect(paths.topicShow(topic.slug));
  
}