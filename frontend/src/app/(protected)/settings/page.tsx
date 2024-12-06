import { getPosts, logout } from '@/actions'
import { auth } from '@auth'
import { Button } from '@components/ui/button'
import { Posts } from './posts'
import { useState } from 'react'



export default async function SettingsPage() {
  const posts = await getPosts()
  const session = await auth()
  let user:any = session?.user
  user = user.user

  return (
    <div>
      <div className='fixed bottom-24 left-1/2 transform -translate-x-1/2'>
        <div className="flex items-center justify-center w-screen">
          <Button
            onClick={async () => {
              'use server'
              await logout()
            }}
            className='px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="flex items-center px-4 py-8 border-b border-white border-opacity-10 fixed top-0 w-screen z-10 bg-[#0B0B09]">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        )}
          <p className="font-semibold">{user.username}</p>
      </div>
      <div className="mt-28 pt-3">
        <h2 className="text-2xl font-semibold mb-3">Your Posts:</h2>
        <Posts posts={posts}></Posts>
      </div>
    </div>
  )
}

