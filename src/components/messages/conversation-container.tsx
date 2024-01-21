'use client';

import { ChatComplete, MessageWithUsersInfos } from "@/db/queries/chats";
import { pusherClient } from "@/lib/pusher";
import { Divider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

interface ConversationShowProps {
  InitialMessages: ChatComplete["messages"];
  userName: string | undefined | null;
  chatId: string;
}

const MessageCard = ({ message, userName }: 
  { message: MessageWithUsersInfos, 
  userName: string | undefined | null }) => {
    return (
      <article key={message.id} className={`border-1 border-slate-400 rounded-lg 
        backdrop-blur-lg bg-opacity-20
        ${message.sender.name === userName ? "self-end text-right bg-blue-950" : 
        "bg-yellow-400 bg-opacity-15" }
        w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2`}>
        <p className="font-bold">{message.sender.name}</p>
        <Divider/>
        <p>{message.content}</p>
      </article>
    )
  }

export default function ConversationShow({ InitialMessages, userName, chatId }: ConversationShowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesReversed = [...InitialMessages].reverse();
  const [incomingMessages, setIncomingMessages] = useState<MessageWithUsersInfos[]>([])
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }
  
  useEffect(() => {
    scrollToBottom();
    pusherClient.subscribe(`chat${chatId}`);
    pusherClient.bind("new-message", (lastMessage: any) => {
      console.log("trigger", lastMessage)
      setIncomingMessages(prevMessages => [...prevMessages, lastMessage])
      scrollToBottom();
    });

    return () => {
      pusherClient.unsubscribe(`chat.${chatId}`);
      pusherClient.unbind("new-message");
    }
  }, [chatId])
  
  return (
    <div
      ref={containerRef}
      className="flex flex-col-reverse gap-2 p-2 w-full flex-1 overflow-y-auto">
        {messagesReversed.map(message => (
          <MessageCard key={message.id} message={message} userName={userName}/>
        ))}
        {incomingMessages.map(message => (
          <MessageCard key={message.id} message={message} userName={userName}/>
        ))}
      </div>
  )
}
