import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center p-4">
      <h1 className="font-bold text-2xl sm:text-4xl text-yellow-400 text-center mb-6 font-swFont">
        il n&apos;y a rien ici
      </h1>
      <p className="font-bold text-yellow-400 sm:text-xl text-center">
        Une erreur de calcul, une route d&apos;hyperespace mal programm&eacute;e ?
      </p>
      <p className="font-bold text-yellow-400 sm:text-xl text-center mb-3">
        Il semble que vous vous soyez perdu dans la bordure extérieure de notre site.
      </p>
      <Link 
        className="w-2/3 sm:w-1/3 my-3"
        href="/" >
        <Button 
          type="button"
          className="w-full font-semibold text-base" 
          color="primary"
          variant="solid"
          > 
          Retour &agrave; l&apos;acceuil
        </Button>
      </Link>
      <Link 
        className="w-2/3 sm:w-1/3 my-3"
        href="/cantina" >
        <Button 
          type="button"
          className="w-full font-semibold text-base" 
          color="warning"
          variant="solid"
          > 
          Vers la cantina
        </Button>
      </Link>
    </main>
  )
}