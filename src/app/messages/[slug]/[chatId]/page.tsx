import { auth } from '@/auth';
import { ChatComplete, fetchChatComplete } from '@/db/queries/chats';
import { Avatar, Card, Divider, Link } from "@nextui-org/react";

interface ChatPageProps {
  params: {
    slug: string;
    chatId: string;
  };
}

const getInterlocutorImage = (chat: ChatComplete, interlocutorName: string) => {
  const interlocutor = chat.users.find(user => user.name === interlocutorName);
    return interlocutor!.image;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth();
  if (!session) {
    return (
      <Card isBlurred className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <div>Vous devez être connecté pour accéder à la messagerie</div>
      </Card>
    )
  }
  const userName = session.user.name;
  const chatId = params.chatId;
  const chat = await fetchChatComplete(chatId);
  if (!chat) {
    return (
      <Card isBlurred className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <div>Conversation introuvable</div>
      </Card>
    )
  }
  const interlocutorName = decodeURIComponent(params.slug);
  const interlocutorImage = getInterlocutorImage(chat, interlocutorName);
  
  return (
    <section className="flex flex-col items-center p-2 w-[95%] sm:w-4/5 min-h-[80vh]
    backdrop-blur-sm rounded-lg bg-slate-950 bg-opacity-30
    border-1 border-slate-400">
      <div className="flex items-center justify-center gap-2 mb-4 w-full relative">
        <Link href="/messages" className="absolute left-4 top-2 text-yellow-400 hover:underline">
          Retour
        </Link>
        <Avatar 
          radius="md"
          src={interlocutorImage}/>
          <span className="font-bold text-yellow-400 text-xl">Conversation avec {interlocutorName}</span>
      </div>
      <div className="flex flex-col gap-2 justify-end w-full flex-1 overflow-y-auto ">
        {chat.messages.map(message => (
          <Card isBlurred key={message.id} className={`flex flex-col gap-1 border-1 border-slate-400
          ${message.sender.name === userName ? "self-end text-right" : ""}
           w-fit sm:max-w-[70%] p-2`}>
            <span className="font-bold">{message.sender.name}</span>
            <Divider/>
            <span>{message.content}</span>
          </Card>
        ))}
      </div>
    </section>
  )
}