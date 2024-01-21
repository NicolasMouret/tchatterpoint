import { db } from '@/db';
import type { Chat, Message, User } from '@prisma/client';

export type UserIdAndName = 
  {id: string, name: string};

export type ChatForList = 
  Chat & {
    interlocutor: {id: string, name: string, image: string};
    lastMessage: 
      {id: string, content: string, senderId: string, receiverId: string, createdAt: Date} | null;
  }

export type MessageWithUsersInfos = 
  Message & {
    sender: {id: string, name: string, image: string};
    receiver: {id: string, name: string, image: string};
  }

export type ChatComplete = 
  Chat & {
    users: User[];
    messages: MessageWithUsersInfos[];
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

export async function fetchChatComplete(chatId: string): Promise<ChatComplete | null> {
  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return chat;
}

export async function fetchChatReceiver(chatId: string, senderId: string): Promise<UserIdAndName | null> {
  const chatWithReceiver = await db.chat.findUnique({
    where: {
      id: chatId,
    },
    select: {
      users: {
        where: {
          id: {
            not: senderId,
          },
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!chatWithReceiver) {
    return null;
  }
  const receiver = chatWithReceiver.users[0];
  return receiver;
}

export async function fetchLastMessageWithUsersInfos(chatId: string): Promise<MessageWithUsersInfos | null> {
  const lastMessage = await db.message.findFirst({
    where: {
      chatId: chatId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return lastMessage;
}
