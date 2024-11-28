import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/comboBox"

export const metadata = {
  title: 'Create Workout - GatorFit',
  description: 'Create a custom workout plan.',
}

const Exercise = ({ id } : {id:number}) => {
  return (
    <div className="flex justify-around space-x-4">
      <Combobox></Combobox>
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">Sets:</h3>
        <Input name={id.toString()} type="number" placeholder="" min="1" max="10" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/>
      </div>
    </div>
  );
};

const WorkoutPage = () => (
  <>
  {/* Title */}
  <div className="mt-4 flex items-center justify-center p-4 border-b border-white/10 text-center">
    <h1 className='font-bold text-xl'>
      Create Workout
    </h1> 
  </div>

  {/* Days */}

  <div className="mt-4 p-4 border-b border-white/10 text-center space-y-6">
    <div className="flex items-center justify-center">
      <h1 className='font-semibold'>
        Chest
      </h1> 
    </div>
    <div className="flex justify-around space-x-4">
      <Combobox></Combobox>
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">Sets:</h3>
        <Input type="number" placeholder="" min="1" max="10" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/>
      </div>
    </div>
    <div className="p-4 flex items-center justify-center mt-12">
      <Button className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
        <PlusCircledIcon></PlusCircledIcon>
        Add Exercise
      </Button>
    </div>
  </div>

  <div className="p-4 flex items-center justify-between">
    
    <div className="flex items-center justify-between">
     
      
    </div>
    <div>
    </div>
  </div>


  <div className="p-4 flex items-center justify-center mt-12">
    <Button className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
      <PlusCircledIcon></PlusCircledIcon>
      Add Day
    </Button>
  </div>
    
  </>
)

export default WorkoutPage
