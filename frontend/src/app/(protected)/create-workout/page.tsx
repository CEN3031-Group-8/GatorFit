import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/comboBox"
import { CreateWorkoutForm } from "./CreateWorkoutForm"

export const metadata = {
  title: 'Create Workout - GatorFit',
  description: 'Create a custom workout plan.',
}

const WorkoutPage = () => (
  <>
  {/* Title */}
  <div className="mt-4 flex items-center justify-center p-4 border-b border-white/10 text-center">
    <h1 className='font-bold text-xl'>
      Create Workout Plan
    </h1> 
  </div>

  {/* Days */}

  <CreateWorkoutForm/>

    
  </>
)

export default WorkoutPage
