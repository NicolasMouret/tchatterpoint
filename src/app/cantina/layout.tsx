export default function CantinaLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{ 
          backgroundImage: 'url("/cantina-bg.jpeg")',        
          }}
      ></div>
      {children}
    </>
  )
}