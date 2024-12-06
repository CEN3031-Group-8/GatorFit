"use client"
import { DotsVerticalIcon, Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { auth } from '@auth'
import { redirect } from 'next/navigation'
import { getActiveWorkoutPlan } from "@/actions/getActiveWorkoutPlan";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { useState, useTransition } from 'react';
import React from "react"
import { Form } from "@/components/ui/form"
import { saveWorkout } from '@actions'
import FormError from '@components/form/FormError'
import FormSuccess from '@components/form/FormSuccess'

class Set {
    weight: string
    reps: string

    constructor(weight?: string) {
        this.weight = weight ?? ""
        this.reps = ""
    }
}

class Exercise {
    title: string
    sets: Set[]


    constructor(title: string, numSets: number ) {
        this.title = title
        this.sets = new Array<Set>
        for (let i = 0; i < numSets; i++) {
            this.sets.push(new Set())
        }
    }
}


const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
    }).format(date);
};
const today = new Date();

const ExerciseComponent = ({exercise, exerciseIndex, stateFunctions} : {exercise: any, exerciseIndex: number, stateFunctions: any}) => {
    const [rawTitle, rawType] = exercise.title.split('|');

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

    const sets = exercise.sets
    
    const getOpacity = (value: string) => {
        if (value == "") return "opacity-50"
        else return ""
    }

    return(
        <div className="">
        {/* Title */}
        <div className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
            <h3 className='font-semibold text-md'>{exerciseTitle}</h3>
            <h3 className='font-light text-xs'>{exerciseType}</h3>
            </div>
            <div>
            <DropdownMenu>
                <DropdownMenuTrigger>          
                <DotsVerticalIcon width="20" height="20"/>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="bg-[#0B0B09] text-white mt-2 mr-2">
                <DropdownMenuItem onClick={() => stateFunctions["addSet"](exerciseIndex)}>Add Set</DropdownMenuItem>
                <DropdownMenuItem onClick={() => stateFunctions["removeSet"](exerciseIndex)}>Remove Set</DropdownMenuItem>
                <DropdownMenuItem onClick={() => stateFunctions["moveExerciseUp"](exerciseIndex)}>Move Exercise Up</DropdownMenuItem>
                <DropdownMenuItem onClick={() => stateFunctions["moveExerciseDown"](exerciseIndex)}>Move Exercise Down</DropdownMenuItem>
                <DropdownMenuItem onClick={() => stateFunctions["removeExercise"](exerciseIndex)}>Remove Exercise</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        {/* Sets */}
        <div className="mt-2 inline-grid grid-cols-3 text-center items-center gap-8 justify-between w-full ">
            <h5 className="text-xs font-normal">SET</h5>
            <h5 className="text-xs font-normal">REPS</h5>
            <h5 className="text-xs font-normal">WEIGHT</h5>

            {sets.map((set: Set, setIndex: number) => 
            <React.Fragment key={setIndex}>
                <p>{setIndex + 1}</p>
                {/* Reps */}
                <div className="flex items-center justify-center">
                    <Input onChange={(event) => {stateFunctions["handleRepsChange"](exerciseIndex, setIndex, event)}} value={set.reps} type="number" placeholder="" className={`bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14 ${getOpacity(set.reps)}`}/>
                    </div>
                {/* Weight */}
                <div className="flex items-center justify-center">
                    <Input onChange={(event) => {stateFunctions["handleWeightChange"](exerciseIndex, setIndex, event)}} value={set.weight} type="number" placeholder="" className={`bg-[#C41E3D] px-3 py-1 rounded-md font-bold text-center border-0 max-w-14 ${getOpacity(set.weight)}`}/>
                </div>
            </React.Fragment>
            )}
        </div>
        </div>
    )
    }



export default function SaveWorkoutForm(activeWorkoutPlan: any) {
    if(!activeWorkoutPlan) redirect("/create-workout")
    activeWorkoutPlan = activeWorkoutPlan.activeWorkoutPlan
    const workoutPlan = activeWorkoutPlan.workoutPlan
    const workoutDay = workoutPlan.workoutDays[activeWorkoutPlan.workoutDayIndex]
    const plannedExercises = workoutDay.plannedExercises
    const e = new Array<Exercise>()
    plannedExercises.forEach((exercise: any) => {
        e.push(new Exercise(exercise.exercise, exercise.numSets))
    })
  
    const [exercises, setExercises] = useState<Exercise[]>([...e])
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    function handleRepsChange(exerciseIndex: number, setIndex: number, event: React.ChangeEvent<HTMLInputElement> ) {
        let newExercises = [...exercises]
        newExercises[exerciseIndex].sets[setIndex].reps = event.target.value
        setExercises(newExercises)
    }

    function handleWeightChange(exerciseIndex: number, setIndex: number, event: React.ChangeEvent<HTMLInputElement> ) {
        let newExercises = [...exercises]
        const sets = exercises[exerciseIndex].sets
        for(let i = setIndex; i < sets.length; i++) {
            newExercises[exerciseIndex].sets[i].weight = event.target.value
        }
        setExercises(newExercises)
    }

    function addSet(exerciseIndex: number) {
        let newExercises = [...exercises]
        const sets = exercises[exerciseIndex].sets
        const lastSet = sets[sets.length - 1]
        sets.push(new Set(lastSet.weight))
        setExercises(newExercises)
    }

    function removeSet(exerciseIndex: number) {
        let newExercises = [...exercises]
        const sets = exercises[exerciseIndex].sets
        sets.pop()
        setExercises(newExercises)
    }

    function moveExerciseUp(exerciseIndex: number) {
        if(exerciseIndex <= 0) return
        let newExercises = [...exercises]
        const temp = newExercises[exerciseIndex]
        newExercises[exerciseIndex] = newExercises[exerciseIndex - 1]
        newExercises[exerciseIndex - 1] = temp
        setExercises(newExercises)
    }

    function moveExerciseDown(exerciseIndex: number) {
        if(exerciseIndex >= exercises.length - 1) return
        let newExercises = [...exercises]
        const temp = newExercises[exerciseIndex]
        newExercises[exerciseIndex] = newExercises[exerciseIndex + 1]
        newExercises[exerciseIndex + 1] = temp
        setExercises(newExercises)
    }

    function removeExercise(exerciseIndex: number) {
        let newExercises = [...exercises]
        newExercises.splice(exerciseIndex, 1)
        setExercises(newExercises)
    }

    // function addExerciseBelow(exerciseIndex: number) {
    //     let newExercises = [...exercises]
    //     newExercises.splice(exerciseIndex, 0, new Exercise())
    //     setExercises(newExercises)
    // }

    const stateFunctions = {
        "handleRepsChange": handleRepsChange,
        "handleWeightChange": handleWeightChange,
        "addSet": addSet,
        "removeSet": removeSet,
        "moveExerciseUp": moveExerciseUp,
        "moveExerciseDown": moveExerciseDown,
        "removeExercise": removeExercise,
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let data = {
            "title": workoutDay.title,
            "exercises": JSON.stringify(exercises),
        }
        startTransition(() => {
            saveWorkout(data).then(({ success, error }) => {
            setSuccess(success)
            setError(error)
            if(success) redirect("/workout")
            })
        })
    }
  
    return(
        <form onSubmit={onSubmit}>
        {/* Title */}
        <div className="top-0 z-10 fixed w-full pt-8 flex items-center justify-between p-4 border-b border-white/10 bg-[#0B0B09] max-w-screen-md">
            <h1 className='font-bold text-xl'>
            {formatDate(today)} - {workoutDay.title}
            </h1>
            {/* <p>{data}</p> */}
            <a href="/create-workout">
                <Pencil2Icon width="20" height="20"/>
            </a>
        </div>
    
        {/* Exercises */}
        <div className="space-y-8 mt-20">
            {exercises.map((exercise: any, index: number) => <ExerciseComponent key={index} exerciseIndex={index} exercise={exercise} stateFunctions={stateFunctions}/> )}
            <FormError message={error} />
            <FormSuccess message={success} />
        </div>

        <div className="p-4 flex items-center justify-center mt-12">
            <Button type="submit" className="bg-[#C41E3D] hover:bg-[#942338] focus:bg-[#942338] font-bold text-xl p-6">
                Save Workout
            </Button>
        </div>
            
        </form>
    )
  }