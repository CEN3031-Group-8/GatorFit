"use client"

import { useState, useTransition } from 'react';
import { redirect } from 'next/navigation'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from '@components/ui/form'
import { Button } from '@/components/ui/button';
import { ExerciseTypeInput } from './exerciseTypeInput';
import { Input } from "@/components/ui/input"
import { PaperPlaneIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormError from '@components/form/FormError'
import FormSuccess from '@components/form/FormSuccess'
import { createWorkoutPlan } from '@actions'
import { WorkoutPlanSchema, WorkoutPlanOptions } from '@schema'


export class Exercise {
    exercise: string
    // numSets is a string because input fields are always string, casting to int should be done in form validation
    numSets: string

    constructor() {
        this.exercise = ""
        this.numSets = ""
    }
}

export class WorkoutDay {
    title: string
    plannedExercises: Exercise[]

    constructor() {
        this.title = ""
        this.plannedExercises = [new Exercise()]
    }
}

const ExerciseElement = ({ workoutDayIndex, exerciseIndex, workoutDays, stateFunctions } : {workoutDayIndex: number, exerciseIndex: number, workoutDays: WorkoutDay[], stateFunctions: any}) => {
    let exercise = workoutDays[workoutDayIndex].plannedExercises[exerciseIndex]
    return (
      <div className="flex justify-around">
        <div >
            <ExerciseTypeInput typeChange={stateFunctions["handleExerciseTypeChange"]}  workoutDayIndex={workoutDayIndex} exerciseIndex={exerciseIndex}/>
        </div>
        <div className="flex items-center">
          <Input onChange={(event) => {stateFunctions["handleNumSetsChange"](workoutDayIndex, exerciseIndex, event)}} value={exercise.numSets} type="number" placeholder="Sets" min="1" max="10" className="px-3 py-1 font-bold text-center border-white rounded-sm w-20 placeholder-gray-400"/>
        </div>
      </div>
    )
}

const WorkoutDayElement = ({workoutDayIndex, workoutDays, stateFunctions } : {workoutDayIndex: number, workoutDays: WorkoutDay[], stateFunctions: any}) => {
    let workoutDay = workoutDays[workoutDayIndex]
    return (
        <div>
            <div className="p-4 text-center space-y-6">
                <div className="flex items-center justify-center">
                    <Input onChange={(event) => {stateFunctions["handleWorkoutTitleChange"](workoutDayIndex, event)}} type="text" placeholder="Workout Title" className="font-semibold w-full text-center border-0 border-b rounded-none placeholder-gray-400" />
                </div>
                <div className="flex flex-col items-stretch space-y-4">
                    {workoutDay.plannedExercises.map((exercise: Exercise, index: number) => (
                        <ExerciseElement key={index} workoutDayIndex={workoutDayIndex}  exerciseIndex={index} stateFunctions={stateFunctions} workoutDays={workoutDays} />
                    ))}
                </div>
                <div className="p-4 flex items-center justify-center mt-12">
                    <Button type="button" onClick={() => stateFunctions["addExercise"](workoutDayIndex)} className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
                        <PlusCircledIcon/>Add Exercise
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export const CreateWorkoutForm = () => {
    const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([
        new WorkoutDay()
    ])
    
    function addWorkoutDay() {
        setWorkoutDays([...workoutDays, new WorkoutDay()]);
    }
    
    function addExercise(workoutDayIndex: number) {
        let newWorkoutDays = [...workoutDays]
        newWorkoutDays[workoutDayIndex].plannedExercises = [...newWorkoutDays[workoutDayIndex].plannedExercises, new Exercise()]
        setWorkoutDays(newWorkoutDays)
    }

    function handleWorkoutTitleChange(workoutDayIndex: number, event: React.ChangeEvent<HTMLInputElement>) {
        let newWorkoutDays = [...workoutDays]
        newWorkoutDays[workoutDayIndex]["title"] = event.target.value
        setWorkoutDays(newWorkoutDays)
    }
    
    function handleExerciseTypeChange(workoutDayIndex: number, exerciseIndex: number, value: string) {
        let newWorkoutDays = [...workoutDays]
        newWorkoutDays[workoutDayIndex].plannedExercises[exerciseIndex]["exercise"] = value
        setWorkoutDays(newWorkoutDays)
    }
    
    function handleNumSetsChange(workoutDayIndex: number, exerciseIndex: number, event: React.ChangeEvent<HTMLInputElement> ) {
        let newWorkoutDays = [...workoutDays]
        newWorkoutDays[workoutDayIndex].plannedExercises[exerciseIndex]["numSets"] = event.target.value
        setWorkoutDays(newWorkoutDays)
    }

    const stateFunctions = {
        "addWorkoutDay": addWorkoutDay, 
        "addExercise": addExercise, 
        "handleWorkoutTitleChange": handleWorkoutTitleChange,
        "handleExerciseTypeChange": handleExerciseTypeChange, 
        "handleNumSetsChange": handleNumSetsChange 
    }

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
  
    const form = useForm<WorkoutPlanOptions>({
      resolver: zodResolver(WorkoutPlanSchema),
      mode: 'onChange',
    //   defaultValues: {
    //     workout-plan-title: '',
    //     // password: '',
    //   },
    })
  
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let data = {
            "title": formData.get("workout-plan-title"),
            "workoutDays": JSON.stringify(workoutDays),
        }
        startTransition(() => {
            createWorkoutPlan(data).then(({ success, error }) => {
            setSuccess(success)
            setError(error)
            if(success) redirect("/workout")
            })
        })
    }

    const onError = () => {
        console.log('error submitting')
    }

    return (
        <Form {...form}>
        <form onSubmit={onSubmit}>
            <div className="flex items-center justify-center p-4">
                <Input type="text" id="workout-plan-title" name="workout-plan-title" placeholder="Workout Plan Title" className="font-semibold w-full text-center  text-white rounded-none placeholder-gray-400" />
            </div>
            <div className="space-y-6">
            {workoutDays.map((workoutDay, index) => (
                <WorkoutDayElement key={index} workoutDayIndex={index} stateFunctions={stateFunctions} workoutDays={workoutDays}/>
            ))}
            </div>
            <div className="p-4 flex items-center justify-center mt-12">
                <Button type="button" onClick={addWorkoutDay} className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold">
                    <PlusCircledIcon></PlusCircledIcon>
                    Add Day
                </Button>
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="fixed flex items-center justify-center bottom-10 w-full">
                <Button
                type='submit'
                disabled={isPending}
                className="bg-white text-gray-900 border-4 border-gray-200 hover:bg-gray-300 focus:bg-gray-300 font-bold text-xl p-6 rounded-lg"
                >
                Create Workout Plan
                </Button>
            </div>
        </form>
        </Form>
    )
}

