import { auth } from '@/auth';
import { Button } from "@nextui-org/react";
import Link from "next/link";



export default async function Home() {
  const session = await auth();

  return (  
    <main className="flex-1 flex flex-col items-center gap-4 px-5 w-full sm:pt-6 text-yellow-400">
      <div 
        className="flex flex-col items-center animate-fadeInFromBottom">
        <h1 
          className={`font-bold text-3xl sm:text-4xl text-yellow-400 text-center mb-2 font-swFont`}>
          Bienvenue sur Tchatterpoint
        </h1>
        <h2 className={`font-bold sm:text-xl text-center mb-8 sm:mb-12`}>
          Le site communautaire autour du jeu
          Star Wars Shatterpoint !
        </h2>
        <p className={`font-semibold text-center mb-4 sm:mb-6`}>
          Vous pourrez ici discuter de tout ce qui concerne le jeu, partager vos
          expériences, vos astuces, vos créations, et surtout trouver des joueurs
          autour de chez vous !
        </p>
        {!session?.user ? 
        <>
        <p className={`font-semibold text-center mb-4 sm:mb-6`}>
        Pour vous rendre visible sur la carte, contacter d&apos;autres joueurs et 
        participer au forum, il vous suffit de vous inscrire ou de vous connecter.
      </p>
      <Link 
        className="w-2/3 sm:w-1/3 mb-4"
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
        className="w-2/3 sm:w-1/3 mb-2"
        href="/sign-in" >
        <Button 
          type="button"
          className="w-full font-semibold text-base" 
          color="warning"
          variant="solid"
          > 
          Se connecter
        </Button>
      </Link></> : 
      <>
      <p className={`text-center font-bold text-lg mb-2`}>
          Pour se trouver
        </p>
        <Link 
          className="w-4/5 sm:w-1/3 mb-8"
          href="/carte-des-joueurs" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="primary"
            variant="solid"
            > 
            Voir la carte des joueurs
          </Button>
        </Link>
        <p className={`text-center font-bold text-lg mb-2`}>
          Pour échanger
        </p>
        <Link 
          className="w-4/5 sm:w-1/3 mb-8"
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
      </>}
      </div>
    </main>
  )
}
