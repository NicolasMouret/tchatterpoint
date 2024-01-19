'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { fetchChatReceiver, fetchLastMessageWithUsersInfos } from "@/db/queries/chats";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";

import { z } from "zod";




const createMessageSchema = z.object({
  content: z.string().min(1, { message: "Vous ne pouvez pas envoyer un message vide" }),
});

interface CreateMessageFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

interface CreateMessageProfileProps {
  receiverId: string;
}

interface CreateMessageChatProps {
  chatId: string;
}

export async function createMessageProfile(
  { receiverId }: CreateMessageProfileProps,
  formState: CreateMessageFormState,
  formData: FormData
): Promise<CreateMessageFormState> {
  const result = createMessageSchema.safeParse({
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
        _form: ["Vous devez être connecté pour envoyer un message"],
      },
    };
  }
  const senderId = session.user.id;
  
  const chat = await db.chat.findFirst({
    where: { 
      AND: [
        { users: { some: { id: senderId } } },
        { users: { some: { id: receiverId } } },
      ]
    },
  }); 
  if (chat) {
    try {
      await db.message.create({
        data: {
          content: result.data.content,
          chatId: chat.id,
          senderId: senderId,
          receiverId: receiverId,
        },
      });
      const lastMessage = await fetchLastMessageWithUsersInfos(chat.id);
      pusherServer.trigger(`chat${chat.id}`, 'new-message', lastMessage);
      return {
        success: true,
        errors: {},
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errors: {
            _form: [error.message],
          },
        };
      } else {
        return {
          errors: {
            _form: ["Le message n'a pas pu être envoyé dans la conversation"],
          },
        };
      }
    }
  }
  if (!chat) {
    try {
      const newChat = await db.chat.create({
        data: {
          users: {
            connect: [
              { id: senderId },
              { id: receiverId },
            ],
          },
        },
      });
      await db.message.create({
        data: {
          content: result.data.content,
          chatId: newChat.id,
          senderId: senderId,
          receiverId: receiverId,
        },
      });
      return {
        success: true,
        errors: {},
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errors: {
            _form: [error.message],
          },
        };
      } else {
        return {
          errors: {
            _form: ["Le message ou la conversation n'ont pas pu être créé"],
          },
        };
      }
    }
  }
  return {
    errors: {
      _form: ["Une erreur inconnue est survenue"],
    },
  }
  
}

export async function createMessageChat(
  { chatId }: CreateMessageChatProps,
  formState: CreateMessageFormState,
  formData: FormData,
): Promise<CreateMessageFormState> {
  const result = createMessageSchema.safeParse({
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
        _form: ["Vous devez être connecté pour envoyer un message"],
      },
    };
  }
  const senderId = session.user.id;
  const receiver = await fetchChatReceiver(chatId, senderId);
  if (!receiver) {
    return {
      errors: {
        _form: ["La conversation n'existe pas"],
      },
    };
  }
  
  try {
    await db.message.create({
      data: {
        content: result.data.content,
        chatId: chatId,
        senderId: senderId,
        receiverId: receiver.id,
      },
    });
    const lastMessage = await fetchLastMessageWithUsersInfos(chatId);
    pusherServer.trigger(`chat${chatId}`, 'new-message', lastMessage);
    revalidatePath(`/messages/${receiver.name}/${chatId}`);
    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Le message n'a pas pu être envoyé dans la conversation"],
        },
      };
    }
  }
}