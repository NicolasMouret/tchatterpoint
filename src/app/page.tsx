import { auth } from '@/auth';
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from "next/link";
import discordIcon from '/public/discord-icon.svg';
import webIcon from '/public/website-click.svg';
import youtubeIcon from '/public/youtube-icon.svg';



export default async function Home() {
  const session = await auth();

  return (  
    <main className="flex-1 flex flex-col items-center gap-4 px-5 w-full sm:pt-6 text-yellow-400">
      <div 
        className="flex flex-col items-center animate-fadeInFromBottom">
        <h1 
          className={`font-bold text-4xl sm:text-6xl text-yellow-400 
          text-center lg:mt-4 mb-2 font-swFont backdrop-blur-sm lg:max-w-[1000px]`}>
          Bienvenue sur Tchatterpoint
        </h1>
        <h2 className={`font-bold sm:text-xl text-center mb-12 sm:mb-16 sm:w-3/5 backdrop-blur-sm`}>
          Le site communautaire autour du jeu
          Star Wars Shatterpoint !
        </h2>
        <p className={`font-semibold text-center mb-4 sm:mb-6 sm:w-4/5 backdrop-blur-sm`}>
          Vous pourrez ici discuter de tout ce qui concerne le jeu, partager vos
          expériences, vos astuces, vos créations, et surtout trouver des joueurs
          autour de chez vous !
        </p>
        <Link 
          className="w-4/5 sm:w-fit mb-14 sm:mb-20"
          href="/carte-des-joueurs" >
          <Button 
            type="button"
            className="w-full font-semibold text-base p-6" 
            color="primary"
            variant="solid"
            > 
            Voir la carte des joueurs
          </Button>
        </Link> 
        <p className="font-semibold text-center mb-4 sm:mb-4 sm:w-4/5 backdrop-blur-sm">
          Pour retrouver toutes les infos et ressources autour du jeu
        </p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 mb-6 sm:mb-12">
          <a 
            className="w-fit"
            href="https://shatterpoint-miniatures.eu/fr"
            target="_blank" >
            <Button 
              type="button"
              aria-label="Site web Shatterpoint-miniatures.eu"
              className="w-full font-semibold text-base" 
              color="warning"
              variant="solid"
              > 
              <Image 
                src={webIcon} 
                alt="generic website icon"
                className="h-8 w-8"
              />
              Shatterpoint-miniatures.eu
            </Button>
          </a>
          <a 
          className="w-4/5 sm:w-fit"
          href="https://discord.gg/h4bQG4CJ2A"
          target="_blank" >
          <Button 
            type="button"
            aria-label="Serveur Discord Star Wars Shatterpoint [FR]"
            className="w-full font-semibold text-base" 
            color="warning"
            variant="solid"
            > 
            <Image 
              src={discordIcon} 
              alt="icone youtube"
              className="h-8 w-8"
            />
            Shatterpoint [FR]
          </Button>
        </a>
        </div>
        <p className="font-semibold text-center mb-4 sm:mb-4 sm:w-4/5 backdrop-blur-sm">
          Rapports de bataille et analyses 
        </p>
        <a 
          className="w-4/5 sm:w-fit mb-6"
          href="https://www.youtube.com/@doublethefall0"
          target="_blank" >
          <Button 
            type="button"
            className="w-full font-semibold text-base" 
            color="warning"
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
