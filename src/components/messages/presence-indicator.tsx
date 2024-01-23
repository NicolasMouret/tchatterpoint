"use client";

import { supabase } from "@/db";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PresenceIndicatorProps {
  interlocutorName: string;
  chatId: string;
}

export default function PresenceIndicator({ interlocutorName, chatId }: PresenceIndicatorProps) {
  const session = useSession();
  const [isInterlocutorOnline, setIsInterlocutorOnline] = useState(false);

  useEffect(() => {
    if (!session || !session.data) return;
    const channel = supabase.channel(`chat:${chatId}`);
    channel
      .on("presence", { event: "join"}, ({newPresences}) => {
        if (newPresences.some(presence => presence.userName === interlocutorName)) {
          setIsInterlocutorOnline(true);
        }      
      })
      .on("presence", { event: "leave"}, ({leftPresences}) => {
        if (leftPresences.some(presence => presence.userName === interlocutorName)) {
          setIsInterlocutorOnline(false);
        }      
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
        await channel.track({
          userName: session.data.user.name,
        });
      });
      
      return () => {
        channel.untrack()
        channel.unsubscribe();
      };

  }, [chatId, session, interlocutorName])

  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`w-2 h-2 rounded-full bg-${isInterlocutorOnline ? "green" : "red"}-500`}></div>
      <p>{isInterlocutorOnline ? "En ligne" : "Hors ligne"}</p>
    </div>
  )
  
}