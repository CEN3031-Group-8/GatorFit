"use client"

import { useState } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from '@components/ui/form'
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/comboBox';
import { Input } from "@/components/ui/input"
import { PlusCircledIcon } from "@radix-ui/react-icons"


const Exercise = ({ exerciseId } : {exerciseId:number}) => {
    return (
      <div className="flex justify-around space-x-4">
        <Combobox></Combobox>
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">Sets:</h3>
          <Input name={"exercise" + exerciseId.toString()} type="number" placeholder="" min="1" max="10" className="bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14"/>
        </div>
      </div>
    )
}

const WorkoutDay = ({ workoutDayId } : {workoutDayId:number}) => {
    const [exerciseIds, setExerciseIds] = useState<number[]>([1])

    function addExercise() {
        const newId = exerciseIds.length + 1;
        setExerciseIds([...exerciseIds, newId]);
    }

    return (
        <div>
        <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
            </FormItem>
        )}
        />

            <div className="mt-4 p-4 border-b border-white/10 text-center space-y-6">
                <div className="flex items-center justify-center">
                    <Input type="text" placeholder="Workout Title" className="font-semibold max-w-52 text-center placeholder-opacity-0" />
                </div>
                <div className="flex flex-col items-stretch space-y-4">
                    {exerciseIds.map((id) => (
                        <Exercise key={id} exerciseId={id} />
                    ))}
                </div>
                <div className="p-4 flex items-center justify-center mt-12">
                    <Button onClick={addExercise} className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
                        <PlusCircledIcon/>Add Exercise
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export const CreateWorkoutForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
  
    const form = useForm<RegisterOptions>({
      resolver: zodResolver(RegisterSchema),
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
      },
    })
  
    const onSubmit = (values: RegisterOptions) => {
      startTransition(() => {
        register(values).then(({ success, error }) => {
          setSuccess(success)
          setError(error)
        })
      })
    }
  
    const onError = () => {
      console.log('error submitting')
    }

    const [workoutDayIds, setWorkoutDayIds] = useState<number[]>([1])

    function addWorkoutDay() {
        const newId = workoutDayIds.length + 1;
        setWorkoutDayIds([...workoutDayIds, newId]);
    }

    return (
        <div>
            {workoutDayIds.map((id) => (
                <WorkoutDay key={id} workoutDayId={id} />
            ))}
            <div className="p-4 flex items-center justify-center mt-12">
                <Button onClick={addWorkoutDay} className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
                    <PlusCircledIcon></PlusCircledIcon>
                    Add Day
                </Button>
            </div>
        </div>
    )
}

