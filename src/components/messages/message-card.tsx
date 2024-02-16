import { supabase } from "@/db";
import { UserWithInfos } from "@/db/queries/users";
import { setDateComment } from "@/libs/utils";
import { CircularProgress, Divider, Image, Link } from "@nextui-org/react";
import { Message } from "@prisma/client";
import { useEffect, useState } from "react";

interface MessageCardProps {
  message: Message;
  userId: string; 
}

export default function MessageCard({ message, userId }: MessageCardProps) {
  const date = setDateComment(message.createdAt);
  const isSender = message.senderId === userId;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ sender, setSender ] = useState<UserWithInfos>();

  // GET UP TO DATE SENDER INFOS
  useEffect(() => {
    supabase
      .from("User")
      .select("*")
      .eq("id", message.senderId)
      .then(({ data: user }) => {
        if (user) setSender(user[0]);
        setIsLoading(false);
      })
  })

  return (
    <article key={message.id} 
    className={`
      border-1 rounded-lg backdrop-blur-lg  
      w-fit max-w-[90%] sm:max-w-[70%] min-h-fit p-2
      ${isSender ? 
      "border-slate-500 bg-opacity-20 self-end text-right bg-blue-950" :
      "border-yellow-100 bg-yellow-500 bg-opacity-30"}`}>
      <div className={`flex gap-2 ${isSender ? "flex-row-reverse" : ""}`}>
        <Image 
          radius="sm"
          alt="user profile picture" 
          src={sender?.image || ""}
          width={40}
          height={40}
          style={{
            width: "45px",
            height: "40px",
            objectFit: "cover",}}/>
        <div className={`flex flex-col ${isSender ? "items-end" : ""}`}>
          <Link href={`/profil/${message.senderId}`}>
            <p className="font-extrabold text-slate-300 hover:underline hover:text-yellow-400">
              {isLoading ? 
              <CircularProgress size="sm"/> : sender?.name || 
              "Utilisateur inconnu"}
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