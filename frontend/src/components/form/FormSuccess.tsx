import { MdCheckCircle } from 'react-icons/md'

interface FormSuccessProps {
  message?: string
}

const FormSuccess = ({ message }: FormSuccessProps) =>
  !message ? null : (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <MdCheckCircle className='h-4 w-4' />
      <p>{message}</p>
    </div>
  )

export default FormSuccess
