'use client';

import { supabase } from "@/db";
import { Divider } from "@nextui-org/react";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ConversationShowProps {
  // initialMessages: ChatComplete["messages"];
  userId: string;
  chatId: string;
}

const MessageCard = ({ message, userId }: 
  { message: Message, 
  userId: string | undefined | null }) => {
    return (
      <article key={message.id} className={`border-1 border-slate-400 rounded-lg 
        backdrop-blur-lg bg-opacity-20
        ${message.senderId === userId ? "self-end text-right bg-blue-950" : 
        "bg-yellow-400 bg-opacity-15" }
        w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2`}>
        <p className="font-bold">{message.senderName}</p>
        <Divider/>
        <p>{message.content}</p>
      </article>
    )
  }

export default function ConversationShow({ userId, chatId }: ConversationShowProps) {
  const router = useRouter();
  const session = useSession();
  const containerRef = useRef<HTMLDivElement>(null)
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([])
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (session.data?.user?.id) {
      supabase
        .from("Message")
        .select("*")
        .eq("chatId", chatId)
        .order("createdAt", { ascending: true })
        .then(({ data: messages }) => {
          setInitialMessages(messages?.reverse() as Message[]);
          scrollToBottom();
        })
    }
  }, [chatId, session])
  
  useEffect(() => {

    scrollToBottom();
    supabase
      .from("UserUnreadMessages")
      .update({ count: 0 })
      .eq("chatId", chatId)
      .eq("userId", userId)
      
    const channel = supabase.channel(`chatChanges`);
    channel
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "Message" }, 
      payload => {          
        if (payload.new.chatId === chatId) {
          setIncomingMessages(prevMessages => [payload.new as Message,...prevMessages]);
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
      supabase
      .from("UserUnreadMessages")
      .update({ count: 0 })
      .eq("chatId", chatId)
      .eq("userId", userId)
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