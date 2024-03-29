import ChatList from '@/components/messages/chat-list';
export const dynamic = 'force-dynamic';


export default function MessagesPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <ChatList/>
    </main>
  )
}

