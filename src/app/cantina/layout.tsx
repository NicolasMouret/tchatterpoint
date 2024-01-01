export default function CantinaLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/cantina-bg.jpeg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",}}
      ></div>
      {children}
    </>
  )
}