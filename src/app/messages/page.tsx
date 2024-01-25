import ChatList from '@/components/messages/chat-list';

export const dynamic = 'force-dynamic';

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <ChatList/>
    </div>
  )
}

