export default function CantinaLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <div
        className="fixed inset-0 bg-no-repeat bg-center"
        style={{ 
          backgroundImage: 'url("/cantina-bg.jpeg")',        
          }}
      ></div>
      {children}
    </>
  )
}