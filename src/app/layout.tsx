import Providers from '@/app/providers'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const swFont = localFont({
  src: './font/Starjedi.ttf',
  variable: '--swFont',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--orbitronFont',
})

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
    <html lang="fr" className={`${orbitron.variable} ${swFont.variable}`}>
      <body className={`dark text-foreground bg-background tracking-wider relative font-stdFont`} style={{
        // use the src property of the image object
        backgroundImage: `url("/bg-space-empty.jpeg")`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
        <Providers>
          <div className="min-h-screen flex flex-col items-center container mx-auto max-w-6xl">
            <Header/>
            {children}
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  )
}
