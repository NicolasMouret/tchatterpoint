
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
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-yellow-400 font-swFont">Carte des joueurs</h1>
      {!session && (
          <>
          <p className={`font-semibold text-center sm:w-4/5 backdrop-blur-sm`}>
          Pour vous rendre visible sur la carte et contacter d&apos;autres joueurs il vous suffit de vous inscrire ou de vous connecter.
        </p>
        <Link 
          className="w-2/3 sm:w-1/3"
          href="/sign-up" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="primary"
            variant="solid"
            > 
            S&apos;inscrire
          </Button>
        </Link>
        <Link 
          className="w-2/3 sm:w-1/3"
          href="/sign-in" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="warning"
            variant="solid"
            > 
            Se connecter
          </Button>
        </Link></>
        )}
      <MapUsersShow usersLocationList={usersLocationList} />
    </main>
  )
}