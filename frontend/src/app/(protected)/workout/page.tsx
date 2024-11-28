import { DotsVerticalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: 'Workout - GatorFit',
  description: 'Log your workout!',
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

const today = new Date();

const WorkoutPage = () => (
  <>
  {/* Title */}
  <div className="mt-4 flex items-center justify-between p-4 border-b border-white/10">
    <h1 className='font-bold text-xl'>
      {formatDate(today)} - Workout Title
      </h1>
      <Pencil2Icon width="20" height="20"/>
  </div>

  {/* Exercises */}
  <div>
    {/* Exercise */}
    <div className="">
      {/* Title */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className='font-semibold text-md'>
            Bench Press
          </h3>
          <h3 className='font-light text-xs'>
            Barbell
          </h3>
        </div>
        <div>
          <DotsVerticalIcon width="20" height="20"/>
        </div>
      </div>
      {/* Sets */}
      <div className="mt-2 inline-grid grid-cols-3 text-center items-center gap-8 justify-between w-full ">
          <h5 className="text-xs font-normal">SET</h5>
          <h5 className="text-xs font-normal">WEIGHT</h5>
          <h5 className="text-xs font-normal">REPS</h5>

          <p>1</p>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          <p>2</p>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          <p>3</p>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>

      </div>
    </div>
  </div>
    
  </>
)

export default WorkoutPage
