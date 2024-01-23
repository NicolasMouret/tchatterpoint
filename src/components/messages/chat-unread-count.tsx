import { auth } from "@/auth";
import { fetchChatUnreadMessages } from "@/db/queries/chats";

interface ChatUnreadCountProps {
  chatId: string;
}

export default async function ChatUnreadCount({ chatId }: ChatUnreadCountProps) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const userId = session.user.id;
  const unreadCount = await fetchChatUnreadMessages(chatId, userId);
  if (unreadCount === 0 || unreadCount === null) {
    return null;
  }
  return (
    <div>
      {unreadCount === 1 ? "1 nouveau message" : `${unreadCount} nouveaux messages`}
    </div>
  )
}