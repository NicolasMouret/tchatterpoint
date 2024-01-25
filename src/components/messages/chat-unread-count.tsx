'use client';
import { supabase } from "@/db";
import { Chip } from "@nextui-org/chip";
import { useEffect, useState } from "react";

interface ChatUnreadCountProps {
  chatId: string;
  initialUnreadState?: boolean;
}

export default function ChatUnreadCount({ chatId, initialUnreadState }: ChatUnreadCountProps) {
  const [hasUnread, setHasUnread] = useState(initialUnreadState);
  useEffect(() => {
    setHasUnread(initialUnreadState);
    console.log("initialUnreadState", initialUnreadState);
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
            else setHasUnread(false);          
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [chatId, initialUnreadState])

  
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