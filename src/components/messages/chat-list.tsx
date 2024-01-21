import { auth } from '@/auth';
import { fetchChatsForList } from "@/db/queries/chats";
import { Avatar, Card } from '@nextui-org/react';
import Link from 'next/link';



export default async function ChatList() {
  const session = await auth();
  if (!session) {
    return (
      <div>Vous devez être connecté pour accéder à la messagerie</div>
    )
  }
  const chats = await fetchChatsForList(session.user.id);
  const renderedChats = chats.map((chat) => {
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
            <div className="flex flex-col gap-1 ml-2">
              <span className="font-bold">{chat.interlocutor.name}</span>
              {chat.lastMessage && 
              <span className="text-xs text-slate-400">{chat.lastMessage.content.slice(0, 30)}...</span>}
            </div>
        </Card> 
      </Link>
    )
  })
  
  return (
    <>
      <h1 className="font-bold text-2xl text-yellow-400">Conversations</h1>
      {renderedChats}
    </>
  )
  
}
