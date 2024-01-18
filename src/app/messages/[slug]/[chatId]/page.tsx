import { auth } from '@/auth';
import ChatInputForm from '@/components/messages/conversation-input';
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

const isUserInChat = (chat: ChatComplete, userId: string) => {
  return chat.users.some(user => user.id === userId);
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

  const {name: userName, id: userId} = session.user;
  const chatId = params.chatId;

  const chat = await fetchChatComplete(chatId);
  if (!chat) {
    return (
      <Card isBlurred className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <div>Conversation introuvable</div>
      </Card>
    )
  }

  if (!isUserInChat(chat, userId)) {
    return (
      <Card isBlurred className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <div>Vous n&apos;&ecirc;tes pas autoris&eacute; &agrave; acc&eacute;der &agrave; cette conversation</div>
      </Card>
    )
  }
  const interlocutorName = decodeURIComponent(params.slug);
  const interlocutorImage = getInterlocutorImage(chat, interlocutorName);
  
  return (
    <section className="flex flex-col items-center p-2 w-[95%] sm:w-4/5 h-[88vh] mb-2
    backdrop-blur-sm rounded-lg bg-slate-950 bg-opacity-30
    border-1 border-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4 w-full relative">
        <Link href="/messages" className="absolute left-4 top-2 text-yellow-400 hover:underline">
          Retour
        </Link>
        <Avatar 
          radius="md"
          src={interlocutorImage}/>
        <span className="font-bold text-yellow-400 text-xl">Conversation avec {interlocutorName}</span>
      </div>
      <Divider/>
      <div className="flex flex-col gap-2 p-2 w-full flex-1 overflow-y-auto">
        {chat.messages.map(message => (
          <article key={message.id} className={`border-1 border-slate-400 rounded-lg 
          backdrop-blur-lg bg-opacity-20
          ${message.sender.name === userName ? "self-end text-right bg-blue-950" : 
          "bg-yellow-400 bg-opacity-15" }
           w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2`}>
            <p className="font-bold">{message.sender.name}</p>
            <Divider/>
            <p>{message.content}</p>
          </article>
        ))}
      </div>
      <Divider/>
      <ChatInputForm chatId={chatId}/>
    </section>
  )
}