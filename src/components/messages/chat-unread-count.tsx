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

  // WORKAROUND THE NEXT 30sec ROUTER CACHE
  // TO GET UP TO DATE UNREAD COUNT ON EVERY RENDER
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

  // REALTIME LISTENING TO UPDATES ON USERUNREADMESSAGES TABLE
  useEffect(() => {
    const userId = session?.data?.user.id;
    const channel = supabase.channel(`unread_messages:${chatId}`);
    channel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "UserUnreadMessages",
          filter: `chatId=eq.${chatId}`
        },
        (payload) => {
          if (payload.new.userId === userId) {
            payload.new.count > 0 ? setHasUnread(true) :
            setHasUnread(false);          
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