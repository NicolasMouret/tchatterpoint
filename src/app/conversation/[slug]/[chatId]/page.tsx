import { auth } from '@/auth';
import ConversationShow from '@/components/messages/conversation-container';
import ChatInputForm from '@/components/messages/conversation-input';
import { ChatComplete, fetchChatComplete } from '@/db/queries/chats';
import { Avatar, Card, Divider, Link, Tooltip } from "@nextui-org/react";
export const dynamic = 'force-dynamic';

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
  const chatId = params.chatId;

  if (!session) {
    return (
      <Card isBlurred className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <div>Vous devez être connecté pour accéder à la messagerie</div>
      </Card>
    )
  }
  const userId = session.user.id;

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
  const interlocutor = chat.users.find(user => user.id !== userId);
  
  return (
    <section className="flex flex-col items-center p-2 w-[95%] sm:w-4/5 h-[88vh] mb-2
    backdrop-blur-sm rounded-lg bg-slate-950 bg-opacity-30
    border-1 border-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4 w-full relative">
        <Link href="/messages" className="absolute left-4 top-2 text-yellow-400 hover:underline">
          Retour
        </Link>
        <Tooltip
          content="Voir le profil"
          placement="left"
          color="warning"
          className="font-medium"
          showArrow>
          <Link 
            className="group flex flex-col sm:flex-row gap-2" 
            href={`/profil/${interlocutor?.id}`}>
            <Avatar 
              radius="md"
              src={interlocutor?.image}/>
            <span className="font-bold text-yellow-400 text-xl group-hover:underline">
              Conversation avec {interlocutor?.name}
            </span>
          </Link>
        </Tooltip>
      </div>
      <Divider/>
        <ConversationShow 
          userId={userId}
          chatId={chatId}/>
      <Divider/>
      <ChatInputForm chatId={chatId}/>
    </section>
  )
}