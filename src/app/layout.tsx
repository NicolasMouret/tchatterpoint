import Providers from '@/app/providers'
import Header from '@/components/header/header'
import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const oswald = Orbitron({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Tchatterpoint',
  description: 'Site communautaire autour du jeu Star Wars Shatterpoint',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body className={`${oswald.className} dark text-foreground bg-background tracking-wider relative`} style={{
        // use the src property of the image object
        backgroundImage: `url("/star_wars_background.png")`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
        <Providers>
          <div className="min-h-screen flex flex-col items-center container mx-auto max-w-6xl">
            <Header/>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
