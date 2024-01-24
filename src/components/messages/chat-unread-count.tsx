import { auth } from "@/auth";
import { Chip } from "@nextui-org/chip";

interface ChatUnreadCountProps {
  chatId: string;
}

export default async function ChatUnreadCount({ chatId }: ChatUnreadCountProps) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const unreadCount = session.user.unreadMessages?.find(
    (unread) => unread.chatId === chatId
  )?.count || 0;
  if (unreadCount === 0 || unreadCount === null) {
    return null;
  }
  return (
    <Chip 
      color="warning" 
      variant="dot"
      radius="sm"
      className="border-yellow-400 border-1.5 w-fit"
      aria-label={`${unreadCount} messages non lus`}>
      <span className="sm:hidden">
        {unreadCount === 1 ? "1 nouveau" : `${unreadCount} nouveaux`}
      </span>
      <span className="hidden sm:inline">
        {unreadCount === 1 ? "1 nouveau message" : `${unreadCount} nouveaux messages`}
      </span>
    </Chip>
  )
}