import { logout } from '@/actions'
import { auth } from '@auth'
import { Button } from '@components/ui/button'

const SettingsPage = async () => {
  const session = await auth()

  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <Button
        onClick={async () => {
          'use server'
          await logout()
        }}
        className='w-fullpx-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
      >
        Logout
      </Button>
    </>
  )
}

export default SettingsPage
