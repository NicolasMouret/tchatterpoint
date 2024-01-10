import { auth } from "@/auth";
import CloudinaryUpload from "@/components/common/cloudinary-upload-button";
import MapUserPosition from "@/components/map/user-position";
import EditPseudoForm from "@/components/user/edit-pseudo-form";
import { fetchUserWithInfos } from "@/db/queries/users";
import { Card, Divider, Image } from "@nextui-org/react";

export const dynamic = 'force-dynamic';

export default async function Profile() {
  const session = await auth();
  if (!session) return (
    <div className="flex flex-col items-center gap-4 px-3 w-full sm:w-4/5">
      <h1 className="font-bold text-xl text-yellow-400">Mon profil</h1>
      <p>Vous n&apos;êtes pas connecté</p>
    </div>
  )
  const user = await fetchUserWithInfos(session.user.id);

  if(!user) return (
    <div className="flex flex-col items-center gap-4 px-3 w-full sm:w-4/5">
      <h1 className="font-bold text-xl text-yellow-400">Mon profil</h1>
      <p>Une erreur est survenue</p>
      <p>{JSON.stringify(session.user)}</p>
    </div>
  )
    
    return (
      <div className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
        <h1 className="font-bold text-2xl text-yellow-400">Mon profil</h1>
        <Divider/>
        <h2 className="font-bold text-lg text-yellow-400">Mes infos</h2>
        <Card 
          className="flex flex-col md:flex-row items-center justify-start md:justify-center md:items-stretch
           gap-4 p-5 mb-2 sm:p-6 w-full lg:w-3/4 border-1 border-slate-500"
          isBlurred>
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
            <CloudinaryUpload />
          </div>
          <div className="flex flex-col items-center sm:items-start justify-start pt-2 gap-4">
            <div className="flex flex-col sm:flex-row sm:gap-2 items-center">
              <span className="font-medium">Pseudo :</span>
              <EditPseudoForm initialPseudo={user.name} />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2 items-center break-all">
              <span className="font-medium">Email :</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </Card>
        <h2 className="font-bold text-lg text-yellow-400">Ma position</h2>
        {user?.location ? 
          <MapUserPosition initialLocation={user.location} /> :
          <MapUserPosition initialLocation={null} />
        }
      </div>
    )
}