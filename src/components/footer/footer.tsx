import Link from "next/link";


export default function Footer() {
  return (
    <footer
      className="flex justify-around z-10 bg-black bg-opacity-80 backdrop-blur-sm 
      border-slate-500 border-t rounded-t-none sm:border sm:border-b-0 sm:rounded-b-none sm:rounded-t-md
      mt-6 px-6 rounded-lg shadow w-full">
      <div className="flex gap-6 items-center justify-center py-4 text-sm">
        <p>Fait avec <span className="text-red-500">♥</span> par Nicolas Mouret </p>
        <p>© 2024 Tchatterpoint</p>
        <Link href="/mentions-legales">Mentions légales</Link>
      </div>
    </footer>
  )
    
}