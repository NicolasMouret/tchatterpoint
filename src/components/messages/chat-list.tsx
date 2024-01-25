import { auth } from '@/auth';
import { ChatForList, fetchChatsForList, hasUnreadMessages } from "@/db/queries/chats";
import { Avatar, Card } from '@nextui-org/react';
import Link from 'next/link';
import ChatUnreadCount from './chat-unread-count';


export default async function ChatList() {
  const session = await auth();
  if (!session || !session.user) {
    return (
      <div>Vous devez être connecté pour accéder à la messagerie</div>
    )
  }

  const chats = await fetchChatsForList(session.user.id);
  const chatCard = async (chat: ChatForList) => {
    const hasUnread = await hasUnreadMessages(chat.id, session.user.id);
    console.log("hasUnread", hasUnread);
    return (
      <Link key={chat.id} 
        className="w-[95%] sm:w-3/5"
        href={`/messages/${chat.interlocutor.name}/${chat.id}`}>
        <Card 
          isBlurred
          className="flex-row items-center border-1 border-slate-400 p-2 w-full">
            <Avatar
              radius="md"
              src={chat.interlocutor.image}/>
            <div className="flex flex-col flex-1 gap-1 ml-2">
              <span className="font-bold">{chat.interlocutor.name}</span>
              {chat.lastMessage && 
              <span className="text-xs text-slate-400">{chat.lastMessage.content.slice(0, 30)}...</span>}
            </div>
            <ChatUnreadCount initialUnreadState={hasUnread} chatId={chat.id} />
        </Card> 
      </Link>
    )
  }
  
  return (
    <>
      <h1 className="font-bold text-2xl text-yellow-400">Conversations</h1>
      {chats.map(chatCard)}
    </>
  )
  
}
