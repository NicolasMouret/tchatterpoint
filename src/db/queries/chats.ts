import { db } from '@/db';
import type { Chat } from '@prisma/client';

// Define the ChatForList type
export type ChatForList = 
  Chat & {
    interlocutor: {id: string, name: string, image: string};
    lastMessage: 
      {id: string, content: string, senderId: string, receiverId: string, createdAt: Date} | null;
  }


export async function fetchChatsForList(userId: string): Promise<ChatForList[]> {
  // Fetch all chats that the user is a part of
  const chatsWithLastMessage = await db.chat.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      }
    },
    include: {
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      messages: {
        select: {
          id: true,
          content: true,
          senderId: true,
          receiverId: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  // Format the data to match the ChatForList type
  const formattedChats: ChatForList[] = chatsWithLastMessage.map((chat) => ({
    ...chat,
    interlocutor: chat.users[0],
    lastMessage: chat.messages.length > 0 ? chat.messages[0] : null,
  }));

  return formattedChats;
}
