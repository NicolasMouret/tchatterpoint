import { auth } from "@/auth";
import MapUserPosition from "@/components/map/user-position";
import { fetchUserWithLocation } from "@/db/queries/users";

export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const session = await auth();
  if (!session) return (
    <div className="px-3 w-full sm:w-4/5">
      <h1>Ma position</h1>
      <p>Veuillez vous connecter pour pouvoir indiquer votre position géographique</p>
    </div>
  )
  const user = await fetchUserWithLocation(session.user.id);
    
    return (
      <div className="flex flex-col items-center gap-4 px-3 w-full sm:w-4/5">
        <h1 className="font-bold text-xl">Ma position</h1>
        {user?.location ? 
          <MapUserPosition initialLocation={user.location} /> :
          <MapUserPosition initialLocation={null} />
        }
      </div>
    )
}