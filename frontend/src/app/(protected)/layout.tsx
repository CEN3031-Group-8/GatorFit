"use client";

import { usePathname } from 'next/navigation'
import { DumbbellIcon } from '../../components/icons/dumbbell';
import { AppleIcon } from '../../components/icons/apple';
import { BookIcon } from '../../components/icons/book';
import { PlayIcon } from '../../components/icons/play';
import { UserIcon } from '../../components/icons/user';

const pages = [ "/workout", "/diet", "/journal", "/feed", "/settings"]
const icons: {[key:string]: JSX.Element} = {
  "/workout": <DumbbellIcon/>,
  "/diet": <AppleIcon/>,
  "/journal": <BookIcon/>,
  "/feed": <PlayIcon/>,
  "/settings": <UserIcon/>,
}

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) => { 
    const pathname = usePathname()
    function isCurrentPage(path: string) {
      return path == pathname
    }

    return (
    <main className=''>
      <div className='mb-36'>
        {children}
      </div>
      {/* Nav Menu */}
      <div className="fixed bottom-0 w-full flex items-center justify-around p-4 bg-[#0B0B09] border-t border-white/10">
        { pages.map((page, index) => (
          isCurrentPage(page) ? 
          (<a key={index} href={page} className="border-b-2 pb-2 border-white">{icons[page]}</a>) :
          (<a key={index} href={page} className="border-b-2 pb-2 border-transparent">{icons[page]}</a>)
        )) }
      </div>
    </main>
  )}
  
  export default layout