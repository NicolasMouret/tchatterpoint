export default function CantinaLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <div
        className="fixed inset-0 bg-cover bg-no-repeat bg-center h-lvh"
        style={{ 
          backgroundImage: 'url("/cantina-bg.jpeg")',        
          }}
      ></div>
      {children}
    </>
  )
}