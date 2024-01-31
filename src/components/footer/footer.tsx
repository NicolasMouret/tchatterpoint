import Link from "next/link";


export default function Footer() {
  return (
    <footer
      className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center justify-around z-10 
      bg-black bg-opacity-80 backdrop-blur-sm border-slate-500 border-t rounded-t-none 
      sm:border sm:border-b-0 sm:rounded-b-none sm:rounded-t-md
      mt-6 px-6 py-2 sm:py-6 rounded-lg shadow w-full">
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 items-center justify-center text-sm">
        <p>Fait avec <span className="text-red-500">♥</span> par Nicolas Mouret </p>
        <p>2024 Tchatterpoint</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 items-center justify-center text-sm">
        <Link 
          className="font-semibold hover:underline hover:text-yellow-400" 
          href="/mentions-legales">
            Mentions légales
        </Link>
        <Link 
          className="font-semibold hover:underline hover:text-yellow-400" 
          href="/politique-confidentialite">
            Politique de confidentialité
        </Link>
      </div>
    </footer>
  )
    
}