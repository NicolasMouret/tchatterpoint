import { setDateComment } from "@/libs/utils";
import { Divider, Image, Link } from "@nextui-org/react";
import { Message } from "@prisma/client";

interface MessageCardProps {
  message: Message;
  userId: string; 
}

export default function MessageCard({ message, userId }: MessageCardProps) {
  const date = setDateComment(message.createdAt);
  const isSender = message.senderId === userId;
  
  if (isSender) {
    return (
      <article key={message.id} 
      className="border-1 border-slate-500 rounded-lg 
        backdrop-blur-lg bg-opacity-20 self-end text-right bg-blue-950
        w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2">
        <div className="flex gap-2 flex-row-reverse">
        <Image 
          alt="user profile picture" 
          src={message.senderImage || ""}
          width={40}
          height={40}
          style={{
            width: "45px",
            height: "40px",
            objectFit: "cover",}}/>
        <div className="flex flex-col items-end">
          <Link href={`/mon-profil`}>
            <p className="font-extrabold text-slate-300 hover:underline hover:text-yellow-400">
              {message.senderName}
            </p>
          </Link>
          <p className="text-small">{date}</p>
        </div>
        </div>
        <Divider className="my-1"/>
        <p className="text-slate-300 p-1">{message.content}</p>
      </article>
    )
  }

  return (
    <article key={message.id} 
      className="border-1 border-yellow-100 rounded-lg 
        backdrop-blur-lg bg-yellow-500 bg-opacity-30
        w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2">
      <div className="flex gap-1">
      <Image 
        alt="user profile picture" 
        src={message.senderImage || ""}
        width={40}
        height={40}
        style={{
          width: "45px",
          height: "40px",
          objectFit: "cover",}}/>
      <div className="flex flex-col">
        <Link href={`/profil/${message.senderId}`}>
          <p className="font-extrabold text-slate-300 hover:underline hover:text-yellow-400">
            {message.senderName}
          </p>
        </Link>
        <p className="text-small">{date}</p>
      </div>
      </div>
      <Divider className="my-1"/>
      <p className="text-slate-300 p-1">{message.content}</p>
    </article>
  )
  
}