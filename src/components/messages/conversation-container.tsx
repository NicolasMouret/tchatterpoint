'use client';

import { ChatComplete } from "@/db/queries/chats";
import { Divider } from "@nextui-org/react";
import { useEffect, useRef } from "react";

interface ConversationShowProps {
  messages: ChatComplete["messages"];
  userName: string | undefined | null;
}

export default function ConversationShow({ messages, userName }: ConversationShowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesReversed = [...messages].reverse()
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  return (
    <div
      ref={containerRef}
      className="flex flex-col-reverse gap-2 p-2 w-full flex-1 overflow-y-auto">
        {messagesReversed.map(message => (
          <article key={message.id} className={`border-1 border-slate-400 rounded-lg 
          backdrop-blur-lg bg-opacity-20
          ${message.sender.name === userName ? "self-end text-right bg-blue-950" : 
          "bg-yellow-400 bg-opacity-15" }
           w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2`}>
            <p className="font-bold">{message.sender.name}</p>
            <Divider/>
            <p>{message.content}</p>
          </article>
        ))}
      </div>
  )
}
