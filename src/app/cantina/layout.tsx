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
          backgroundRepeat: "no-repeat",         
          }}
      ></div>
      {children}
    </>
  )
}