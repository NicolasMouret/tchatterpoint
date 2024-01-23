'use client';

import { supabase } from "@/db";
import { ChatComplete } from "@/db/queries/chats";
import { Divider } from "@nextui-org/react";
import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

interface ConversationShowProps {
  initialMessages: ChatComplete["messages"];
  userName: string | undefined | null;
  chatId: string;
}

const MessageCard = ({ message, userName }: 
  { message: Message, 
  userName: string | undefined | null }) => {
    return (
      <article key={message.id} className={`border-1 border-slate-400 rounded-lg 
        backdrop-blur-lg bg-opacity-20
        ${message.senderName === userName ? "self-end text-right bg-blue-950" : 
        "bg-yellow-400 bg-opacity-15" }
        w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2`}>
        <p className="font-bold">{message.senderName}</p>
        <Divider/>
        <p>{message.content}</p>
      </article>
    )
  }

export default function ConversationShow({ initialMessages, userName, chatId }: ConversationShowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reversedInitialMessages = [...initialMessages].reverse();
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([])
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }
  
  useEffect(() => {
    scrollToBottom();
    const channel = supabase.channel(`chatChanges`);
    channel
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "Message" }, 
      payload => {
        const newMessage = payload.new as Message;
        if (newMessage.chatId === chatId) {
          console.log("new message", newMessage);
          setIncomingMessages(prev => [...prev, newMessage].reverse());
          scrollToBottom();
        }           
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [chatId])
  
  return (
    <div
      ref={containerRef}
      className="flex flex-col-reverse gap-2 p-2 w-full flex-1 overflow-y-auto">
        {incomingMessages.map(message => (
          <MessageCard key={message.id} message={message} userName={userName}/>
        ))}
        {reversedInitialMessages.map(message => (
          <MessageCard key={message.id} message={message} userName={userName}/>
        ))}
      </div>
  )
}