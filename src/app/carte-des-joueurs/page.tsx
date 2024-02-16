
import { auth } from "@/auth";
import MapUsersShow from "@/components/map/users-map";
import { fetchAllUsersWithLocation } from "@/db/queries/users";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const usersLocationList = await fetchAllUsersWithLocation();
  const session = await auth();

  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-3 w-full sm:w-4/5">
      <h1 className="font-bold text-2xl sm:text-3xl text-yellow-400 font-swFont">Carte des joueurs</h1>
      { !session ? 
      <>
        <p>Connectez vous pour pouvoir vous placer sur la carte</p>
        <Link 
          className="w-2/3 sm:w-1/3 mb-2"
          href="/sign-in" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="primary"
            variant="solid"
            > 
            Se connecter
          </Button>
        </Link>
      </> : null}
      <MapUsersShow usersLocationList={usersLocationList} />
    </main>
  )
}