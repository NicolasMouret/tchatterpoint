import Providers from '@/app/providers'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ subsets: ['latin']})

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
      <body className={`${orbitron.className} dark text-foreground bg-background tracking-wider relative`} style={{
        // use the src property of the image object
        backgroundImage: `url("/star_wars_background.png")`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
        <Providers>
          <div className="min-h-dvh flex flex-col items-center container mx-auto max-w-6xl">
            <Header/>
            {children}
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  )
}
