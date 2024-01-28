'use client';
import { supabase } from "@/db";
import { Chip } from "@nextui-org/chip";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ChatUnreadCountProps {
  chatId: string;
}

export default function ChatUnreadCount({ chatId }: ChatUnreadCountProps) {
  const session = useSession(); 
  const [hasUnread, setHasUnread] = useState<boolean>();
  console.log("rendering chat unread count");

  useEffect(() => {
    if (session?.data?.user.id) {
      supabase
        .from("UserUnreadMessages")
        .select("count")
        .eq("chatId", chatId)
        .eq("userId", session.data.user.id)
        .then(({ data: count }) => {
          if (count && count[0].count > 0) setHasUnread(true);
          else if (count && count[0].count === 0) setHasUnread(false);
        })
    }
  })

  useEffect(() => {
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
          if (payload.new.chatId === chatId && payload.new.userId === session?.data?.user.id) {
            if (payload.new.count > 0) setHasUnread(true);
            else if (payload.new.count === 0) setHasUnread(false);          
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [chatId, session])

  
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