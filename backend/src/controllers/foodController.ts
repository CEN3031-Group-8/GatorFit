import { FoodDay } from '../models'

export const saveFood = async (data: any) => {
  try {
    const foodDay = await FoodDay.findOne({creator: data.creator, date: new Date(data.date)})
    if(foodDay) {
      foodDay.foods = data.foods
      await foodDay.save()
    } else {
      data.date = new Date(data.date)
      const newFoodDay = new FoodDay({ ...data })
      await newFoodDay.save()

    }
   
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}