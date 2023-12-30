import Providers from '@/app/providers'
import Header from '@/components/header/header'
import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const oswald = Orbitron({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body className={`${oswald.className} dark text-foreground bg-background tracking-wider`} style={{
        // use the src property of the image object
        backgroundImage: `url("/space-bg.jpg")`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}>
        <Providers>
          <div className="min-h-screen flex flex-col items-center container mx-auto max-w-6xl relative">
            <Header/>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
