import { db } from '@/db';
import type { Chat, Message, User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export type ReceiverBasicInfos = 
  {id: string, name: string, image: string};

export type ChatForList = 
  Chat & {
    interlocutor: {id: string, name: string, image: string};
    lastMessage: 
      {id: string, content: string, senderId: string, receiverId: string, createdAt: Date} | null;
  }

// export type MessageWithUsersInfos = 
//   Message & {
//     sender: {id: string, name: string, image: string};
//     receiver: {id: string, name: string, image: string};
//   }

export type ChatComplete = 
  Chat & {
    users: User[];
    messages: Message[];
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
          senderName: true,
          senderImage: true,
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
  console.log("fetchchat");
  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      users: true,
      messages: true,
    },
  });

  return chat;
}

export async function fetchChatReceiver(chatId: string, senderId: string): Promise<ReceiverBasicInfos | null> {
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
          image: true,
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

export async function fetchLastMessageWithUsersInfos(chatId: string): Promise<Message | null> {
  const lastMessage = await db.message.findFirst({
    where: {
      chatId: chatId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return lastMessage;
}

export async function incrementUnreadMessages(chatId: string, receiverId: string): Promise<void> {
  try {
    const chatUnreadMessages = await db.userUnreadMessages.findFirst({
      where: {
        userId: receiverId,
        chatId: chatId,
      }
    });
    await db.userUnreadMessages.update({
      where: {
        id: chatUnreadMessages!.id,
      },
      data: {
        count: chatUnreadMessages!.count + 1,
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export async function resetUnreadMessages(chatId: string, userId: string): Promise<void> {
  try {
    const chatUnreadMessages = await db.userUnreadMessages.findFirst({
      where: {
        userId: userId,
        chatId: chatId,
      }
    });
    await db.userUnreadMessages.update({
      where: {
        id: chatUnreadMessages!.id,
      },
      data: {
        count: 0,
      }
    })
    revalidatePath("/messages")
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export async function fetchChatUnreadMessagesCount(chatId: string, userId: string): Promise<number> {
  console.log(chatId, userId);
  try {
    const chatUnreadMessages = await db.userUnreadMessages.findFirst({
      where: {
        userId: userId,
        chatId: chatId,
      }
    });
    return chatUnreadMessages!.count;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export async function hasUnreadMessages(chatId: string, userId: string): Promise<boolean> {
  try {
    const chatUnreadMessages = await db.userUnreadMessages.findFirst({
      where: {
        userId: userId,
        chatId: chatId,
      }
    });
    if (!chatUnreadMessages) {
      return false;
    }
    return chatUnreadMessages.count > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export async function hasAnyUnreadMessages(userId: string | undefined): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }
    const allUnreadMessages = await db.userUnreadMessages.findMany({
      where: {
        userId: userId,
      }
    });
    const unreadMessagesCount = allUnreadMessages.reduce((acc, curr) => acc + curr.count, 0);
    return unreadMessagesCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}
