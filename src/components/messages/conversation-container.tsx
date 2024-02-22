'use client';

import { supabase } from "@/db";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MessageCard from "./message-card";

interface ConversationShowProps {
  // initialMessages: ChatComplete["messages"];
  userId: string;
  chatId: string;
}

export default function ConversationShow({ userId, chatId }: ConversationShowProps) {
  const router = useRouter();
  const session = useSession();

  const containerRef = useRef<HTMLDivElement>(null)
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  // WAY TO GET UP TO DATE MESSAGES ON EVERY RENDER
  // AS A WORKAROUND TO THE NEXT 30sec ROUTER CACHE
  useEffect(() => {
    if (session.data?.user?.id) {
      supabase
        .from("Message")
        .select("*")
        .eq("chatId", chatId)
        .order("createdAt", { ascending: false })
        .then(({ data: messages }) => {
          setIncomingMessages([]); //reset local state to avoid any duplicates
          setInitialMessages(messages as Message[]);
        })
    }
  }, [chatId, session])
  
  useEffect(() => {
    scrollToBottom();
    supabase // reset unread messages count 
      .from("UserUnreadMessages")
      .update({ count: 0 })
      .eq("chatId", chatId)
      .eq("userId", userId)
      .then() 

    // REALTIME LISTENING TO INSERTS WITH chatId IN MESSAGE TABLE
    // ADD THEM TO LOCAL TEMP STATE
    const channel = supabase.channel(`chatChanges`);
    channel
      .on("postgres_changes", { 
        event: "INSERT", 
        schema: "public", 
        table: "Message", 
        filter: `chatId=eq.${chatId}`
       }, 
      payload => {
          setIncomingMessages(prevMessages => [payload.new as Message,...prevMessages]);
          requestAnimationFrame(scrollToBottom);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [chatId, initialMessages, userId, router])
  
  return (
    <div
      ref={containerRef}
      className="flex flex-col-reverse gap-2 p-2 w-full flex-1 overflow-y-auto">
        {incomingMessages.map(message => (
          <MessageCard key={message.id} message={message} userId={userId}/>
        ))}
        {initialMessages ? initialMessages.map(message => (
          <MessageCard key={message.id} message={message} userId={userId}/>
        )) :
        null}
      </div>
  )
}