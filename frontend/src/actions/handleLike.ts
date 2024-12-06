'use server'

import { auth } from '@auth'

export const createLike = async (postid: string) => {
    const session = await auth()
    if(!session) return { error: 'Not logged in' }
    const user : any = session.user

    if (
        typeof process.env.BACKEND_URL !== 'string' ||
        typeof process.env.API_KEY !== 'string'
    ) {
        console.log('env error')
        return { error: 'Something went wrong' }
    }

    const createWorkoutUrl = process.env.BACKEND_URL + `/create-like/${user.user.id}/${postid}`
    try {
        const res = await fetch(createWorkoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.API_KEY,
        },
        })
        
        if (!res.ok) {
        const body = await res.json()
        return { error: body.error }
        } else {
        return { success: 'Liked successfully!' }
        }
    } catch (error: any) {
        return { error: error.message }
    }
}

export const deleteLike = async (postid: string) => {
    const session = await auth()
    if(!session) return { error: 'Not logged in' }
    const user : any = session.user

    if (
        typeof process.env.BACKEND_URL !== 'string' ||
        typeof process.env.API_KEY !== 'string'
    ) {
        console.log('env error')
        return { error: 'Something went wrong' }
    }

    const createWorkoutUrl = process.env.BACKEND_URL + `/delete-like/${user.user.id}/${postid}`
    try {
        const res = await fetch(createWorkoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.API_KEY,
        },
        })
        
        if (!res.ok) {
        const body = await res.json()
        return { error: body.error }
        } else {
        return { success: 'Deleted successfully!' }
        }
    } catch (error: any) {
        return { error: error.message }
    }
}
