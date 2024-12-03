import { DotsVerticalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { auth } from '@auth'
import { getActiveWorkoutPlan } from "@/actions/getActiveWorkoutPlan";
import { redirect } from 'next/navigation'

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

const Exercise = ({exercise} : {exercise: any}) => {
  const [rawTitle, rawType] = exercise.exercise.split('|');

  // Function to capitalize and format text
  const formatText = (text: string): string => {
    return text
      .split('-') // Split by hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with a space
  };

  // Transform the parts
  const exerciseTitle = formatText(rawTitle);
  const exerciseType = formatText(rawType);

  const sets = [...Array(exercise.numSets)]

  return(
    <div className="">
      {/* Title */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className='font-semibold text-md'>{exerciseTitle}</h3>
          <h3 className='font-light text-xs'>{exerciseType}</h3>
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

        {sets.map((_, index) => 
          <>
            <p>{index + 1}</p>
            <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
            <div className="flex items-center justify-center"><Input type="number" placeholder="" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/></div>
          </>
        )}

      </div>
    </div>
  )
}

export default async function WorkoutPage() {
  const activeWorkoutPlan = await getActiveWorkoutPlan()
  console.log(activeWorkoutPlan.status)
  if(!activeWorkoutPlan) redirect("/create-workout")

  const workoutPlan = activeWorkoutPlan.workoutPlan
  const workoutDay = workoutPlan.workoutDays[activeWorkoutPlan.workoutDayIndex]
  const exercises = workoutDay.plannedExercises

  return(
    <>
    {/* Title */}
    <div className="mt-4 flex items-center justify-between p-4 border-b border-white/10">
      <h1 className='font-bold text-xl'>
        {formatDate(today)} - {workoutDay.title}
        </h1>
        {/* <p>{data}</p> */}
        <a href="/create-workout">
          <Pencil2Icon width="20" height="20"/>
        </a>
    </div>

    {/* Exercises */}
    <div className="space-y-8">
      {exercises.map((exercise: any, index: number) => <Exercise key={index} exercise={exercise}/> )}
    </div>
      
    </>
  )
}

