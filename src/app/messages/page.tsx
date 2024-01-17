import ChatList from '@/components/messages/chat-list'

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <h1 className="font-bold text-2xl text-yellow-400">Conversations</h1>
      <ChatList/>
    </div>
  )
}

