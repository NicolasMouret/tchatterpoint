import ChatList from '@/components/messages/chat-list';
import { unstable_noStore } from 'next/cache';
export const revalidate = 0;


export default function MessagesPage() {
  unstable_noStore();
  return (
    <div className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <ChatList/>
    </div>
  )
}

