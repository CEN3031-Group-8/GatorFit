const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <main className='bg-white dark:bg-gray-900'>
    <div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
      <div className='w-full max-w-md'>
        <img
          className='w-auto h-7 sm:h-8'
          alt='GatorFit'
          src='https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/640px-Florida_Gators_gator_logo.svg.png'
        />
        {children}
      </div>
    </div>
  </main>
)

export default layout
