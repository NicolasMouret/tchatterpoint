
import MapUsersShow from "@/components/map/users-map";
import { fetchAllUsersWithLocation } from "@/db/queries/users";

export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const usersLocationList = await fetchAllUsersWithLocation();

  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <h1 className="font-bold text-2xl sm:text-3xl text-yellow-400 font-swFont">Carte des joueurs</h1>
      <MapUsersShow usersLocationList={usersLocationList} />
    </main>
  )
}