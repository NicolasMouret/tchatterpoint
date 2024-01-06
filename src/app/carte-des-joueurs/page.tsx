
import MapUsersShow from "@/components/map/users-map";
import { fetchAllUsersWithLocation } from "@/db/queries/users";

export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const usersLocationList = await fetchAllUsersWithLocation();

  return (
    <div className="flex flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <h1 className="font-bold text-xl text-yellow-400">Carte des joueurs</h1>
      <MapUsersShow usersLocationList={usersLocationList} />
    </div>
  )
}