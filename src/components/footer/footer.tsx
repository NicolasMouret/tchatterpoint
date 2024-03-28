import Link from "next/link";


export default function Footer() {
  return (
    <footer
      className="flex flex-col lg:flex-row lg:gap-6 items-center justify-around z-10
      bg-black bg-opacity-80 backdrop-blur-sm border-slate-500 border-t
      mt-6 px-6 py-2 sm:py-6 shadow w-[100vw]">
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 items-center justify-center text-sm">
        <p>Fait avec <span className="text-red-500">♥</span> par Nicolas Mouret </p>
        <p>2024 Tchatterpoint</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-6 items-center justify-center text-sm">
        <Link 
          className="font-semibold hover:underline p-[14px] hover:text-yellow-400" 
          href="/mentions-legales">
            Mentions légales
        </Link>
        <Link 
          className="font-semibold hover:underline p-[14px] hover:text-yellow-400" 
          href="/politique-confidentialite">
            Politique de confidentialité
        </Link>
      </div>
    </footer>
  )
    
}