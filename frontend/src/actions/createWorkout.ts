'use server'
export const createWorkoutPlan = async (data: any) => {
  if (
    typeof process.env.BACKEND_URL !== 'string' ||
    typeof process.env.API_KEY !== 'string'
  ) {
    console.log('env error')
    return { error: 'Something went wrong' }
  }

  const createWorkoutUrl = process.env.BACKEND_URL + '/create-workout'
  try {
    const res = await fetch(createWorkoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.API_KEY,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const body = await res.json()
      return { error: body.error }
    } else {
      return { success: 'Registered successfully!' }
    }
  } catch (error: any) {
    return { error: error.message }
  }
}
