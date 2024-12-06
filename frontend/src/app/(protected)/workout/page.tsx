import { getActiveWorkoutPlan } from "@/actions/getActiveWorkoutPlan";
import SaveWorkoutForm from "./saveWorkoutForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Workout - GatorFit',
  description: 'Log your workout!',
}

export default async function WorkoutPage() {
  const activeWorkoutPlan = await getActiveWorkoutPlan()
  if(!activeWorkoutPlan) redirect("/create-workout")
  return (
  <SaveWorkoutForm activeWorkoutPlan={activeWorkoutPlan}></SaveWorkoutForm>
)
}

