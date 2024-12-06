import { getActiveWorkoutPlan } from "@/actions/getActiveWorkoutPlan";
import SaveWorkoutForm from "./saveWorkoutForm";

export const metadata = {
  title: 'Workout - GatorFit',
  description: 'Log your workout!',
}

export default async function WorkoutPage() {
  const activeWorkoutPlan = await getActiveWorkoutPlan()
  return (
  <SaveWorkoutForm activeWorkoutPlan={activeWorkoutPlan}></SaveWorkoutForm>
)
}

