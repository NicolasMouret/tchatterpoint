import { auth } from "@/auth";
import SendMessageForm from "@/components/messages/send-message";
import { fetchUserWithInfos } from "@/db/queries/users";
import { Card, Divider, Image } from "@nextui-org/react";
import { redirect } from 'next/navigation';



interface PublicProfilePageProps {
  params: {
    userId: string;
  };
}

export default async function publicProfilePage({ params }: PublicProfilePageProps) {
  const session = await auth();
  const userId = params.userId;
  const user = await fetchUserWithInfos(userId);
  if (!user) return (
    <div>
      <h1>Utilisateur introuvable</h1>
    </div>
  )

  if (userId === session?.user?.id) {
    redirect("/mon-profil");
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-4 px-3 w-full sm:w-4/5">
      <h1 className="font-bold text-2xl sm:text-3xl font-swFont text-yellow-400">Profil de {user.name}</h1>
      <Divider/>
      <Card 
        className="border-1 border-slate-500 w-full lg:w-3/4 py-5 px-2 sm:p-6 mb-2"
        isBlurred>
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-center 
        md:items-stretch gap-4">
          <div className="relative">
            <Image 
              alt="Image de profil" 
              src={user?.image || ""} 
              width={80} 
              height={80}
              isBlurred
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",}}
              />
          </div>
          <div className="flex flex-col items-center sm:items-start justify-start pt-2 gap-4">
            <div className="flex flex-col sm:flex-row sm:gap-2 items-center">
              <span className="font-medium">Pseudo :</span>
              <span>{user.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2 items-center break-all">
              <span className="font-medium">Email :</span>
              <span>{user.mailIsPublic ? 
              user.email : "Email privé"}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <span className="font-medium">Bio :</span>
          <span className="text-center">{user.biography}</span>
        </div>
        {session ? 
          <div className="flex flex-col items-center mt-4 w-full">
            <SendMessageForm receiverId={userId}/>
          </div> :
          <div>Vous devez être connecté pour envoyer un message à {user.name}</div>}
      </Card>
    </div>
  )
}