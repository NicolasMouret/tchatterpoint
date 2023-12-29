import { auth } from "@/auth";
import MapUserPosition from "@/components/map/user-position";

export default async function MapPage() {
  const session = await auth();
  if (!session) return (
    <div className="px-3 w-full sm:w-4/5">
      <h1>Ma position</h1>
      <p>Veuillez vous connecter pour pouvoir indiquer votre position géographique</p>
    </div>
  )

  if (session.user.latitude && session.user.longitude) {
    const userLocation = {lat: session.user.latitude, lng: session.user.longitude}
    return (
      <div className="flex flex-col items-center gap-4 px-3 w-full sm:w-4/5">
        <h1 className="font-bold text-xl">Ma position</h1>
        <MapUserPosition initialLocation={userLocation} />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center gap-4 px-3 w-full sm:w-4/5">
        <h1 className="font-bold text-xl">Ma position</h1>
        <MapUserPosition initialLocation={null} />
      </div>
    )
  }
}