import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";



export default function Home() {
  return (  
    <main className="flex-1 flex flex-col items-center gap-4 p-3 w-full">
      <Card 
        isBlurred 
        className="border-1 border-slate-400 w-full"
        >
        <CardHeader className="flex justify-center">
          <h1 className={`font-bold text-2xl text-yellow-400 font-swFont`}>Accueil</h1>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p className="font-medium text-center">
            Bienvenu sur Tchatterpoint, l&apos;application communautaire autour du jeu
            Star Wars Shatterpoint !
          </p>
        </CardBody>
      </Card>
    </main>
  )
}
