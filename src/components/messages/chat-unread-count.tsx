'use client';
import { supabase } from "@/db";
import { Chip } from "@nextui-org/chip";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ChatUnreadCountProps {
  chatId: string;
}

interface Unread {
  chatId: string;
  count: number;
}

export default function ChatUnreadCount({ chatId }: ChatUnreadCountProps) {
  const session = useSession(); 
  const unread = session?.data?.user.unreadMessages?.find(
    (unread: Unread ) => unread.chatId === chatId);
  const [hasUnread, setHasUnread] = useState<boolean>();
  useEffect(() => {
    if (unread) {
      setHasUnread(!!unread.count);
      console.log("unread", unread);
    }
    const channel = supabase.channel(`unread_messages:${chatId}`);
    channel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "UserUnreadMessages",
        },
        (payload) => {
          if (payload.new.chatId === chatId) {
            if (payload.new.count > 0) setHasUnread(true);
            else if (payload.new.count === 0) setHasUnread(false);          
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [chatId, unread])

  
  return (
    hasUnread ? 
    <Chip 
      color="warning" 
      variant="dot"
      radius="sm"
      className="border-yellow-400 border-1.5 w-fit">
      <span>Nouveau(x) message(s)</span>
    </Chip> : null
  )
}