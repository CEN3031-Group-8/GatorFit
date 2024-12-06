import { Schema, model } from 'mongoose'

export const foodSchema = new Schema({
    
    name: {
        type: String
    },
    amount: {
        type: String
    },
    calories: {
        type: Number
    },
    protein: {
        type: Number
    },
    carbs: {
        type: Number
    },
    fats: {
        type: Number
    }
})

export const foodDaySchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    date: {
        type: Date,
    },
    foods: {
        type: [foodSchema]
    }
})


// Create models
export const FoodDay = model('FoodDay', foodDaySchema);