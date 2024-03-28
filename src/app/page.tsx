import { auth } from '@/auth';
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from "next/link";
import youtubeIcon from '/public/youtube-icon.svg';



export default async function Home() {
  const session = await auth();

  return (  
    <main className="flex-1 flex flex-col items-center gap-4 px-5 w-full sm:pt-6 text-yellow-400">
      <div 
        className="flex flex-col items-center animate-fadeInFromBottom">
        <h1 
          className={`font-bold text-4xl sm:text-6xl text-yellow-400 
          text-center mt-4 mb-2 font-swFont backdrop-blur-sm lg:max-w-[1000px]`}>
          Bienvenue sur Tchatterpoint
        </h1>
        <h2 className={`font-bold sm:text-xl text-center mb-8 sm:mb-12 sm:w-3/5 backdrop-blur-sm`}>
          Le site communautaire autour du jeu
          Star Wars Shatterpoint !
        </h2>
        <p className={`font-semibold text-center mb-4 sm:mb-6 sm:w-4/5 backdrop-blur-sm`}>
          Vous pourrez ici discuter de tout ce qui concerne le jeu, partager vos
          expériences, vos astuces, vos créations, et surtout trouver des joueurs
          autour de chez vous !
        </p>
        <Link 
          className="w-4/5 sm:w-1/3 mb-10"
          href="/carte-des-joueurs" >
          <Button 
            type="button"
            className="w-full font-semibold text-base p-6" 
            color="primary"
            variant="shadow"
            > 
            Voir la carte des joueurs
          </Button>
        </Link> 
        <p className="font-semibold text-center mb-4 sm:mb-6 sm:w-4/5 backdrop-blur-sm">
          Pour retrouver toutes les infos et ressources autour du jeu
        </p>
        <a 
          className="w-4/5 sm:w-1/3 mb-6"
          href="https://shatterpoint-miniatures.eu/fr"
          target="_blank" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="primary"
            variant="solid"
            > 
            Shatterpoint-miniatures.eu
          </Button>
        </a> 
        <p className="font-semibold text-center mb-4 sm:mb-6 sm:w-4/5 backdrop-blur-sm">
          Rapports de bataille et analyses 
        </p>
        <a 
          className="w-4/5 sm:w-1/3 mb-6"
          href="https://www.youtube.com/@doublethefall0"
          target="_blank" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="primary"
            variant="solid"
            > 
            <Image 
              src={youtubeIcon} 
              alt="icone youtube"
              className="h-8 w-8"
            />
            Double the fall
          </Button>
        </a> 
      </div>
    </main>
  )
}
