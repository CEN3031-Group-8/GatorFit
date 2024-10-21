import { MdErrorOutline } from 'react-icons/md'

interface FormErrorProps {
  message?: string
}

const FormError = ({ message }: FormErrorProps) =>
  !message ? null : (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <MdErrorOutline className='h-4 w-4' />
      <p>{message}</p>
    </div>
  )

export default FormError
