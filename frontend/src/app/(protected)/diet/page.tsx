// npm install axios
//npm install mongodb
// npm install express mongoose dotenv cors
// npm install next
//npm install dayjs

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const NutritionTracker = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dataByDate, setDataByDate] = useState({});

  const appId = "12125993"; // Replace with Edamam app ID
  const appKey = "002ab0abce55914fbabdb08a49f8dd82"; // Replace with Edamam API key
  const nutritionApiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

  // Default macros and meals for a new day
  const getDefaultData = () => ({
    macros: {
      calories: { current: 0, target: 2400, unit: "kcal", color: "bg-red-500" },
      protein: { current: 0, target: 180, unit: "g", color: "bg-green-500" },
      carbs: { current: 0, target: 250, unit: "g", color: "bg-pink-400" },
      fats: { current: 0, target: 50, unit: "g", color: "bg-amber-700" },
    },
    meals: [],
  });

  const getDataForDate = (date) => {
    if (!dataByDate[date]) {
      setDataByDate((prev) => ({ ...prev, [date]: getDefaultData() }));
    }
  };

  useEffect(() => {
    getDataForDate(currentDate);
  }, [currentDate]);

  const currentData = dataByDate[currentDate] || getDefaultData();
  const { macros, meals } = currentData;

  const updateDataForCurrentDate = (updatedMeals, updatedMacros) => {
    setDataByDate((prev) => ({
      ...prev,
      [currentDate]: {
        meals: updatedMeals || meals,
        macros: updatedMacros || macros,
      },
    }));
  };

  const fetchNutrition = async (foodText, mealId) => {
    try {
      const response = await axios.post(nutritionApiUrl, { ingr: [foodText] });
      const { totalNutrients } = response.data;

      const updatedMeals = meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              calories: Math.round(totalNutrients.ENERC_KCAL?.quantity || 0),
              protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
              carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
              fats: Math.round(totalNutrients.FAT?.quantity || 0),
            }
          : meal
      );
      updateDataForCurrentDate(updatedMeals);
    } catch (error) {
      console.error("Error fetching nutrition:", error);
      alert("Unable to fetch nutrition for the entered food.");
    }
  };

  const handleMealBlur = (id, name) => {
    if (name.trim()) {
      fetchNutrition(name, id);
    }
  };

  const handleMealChange = (id, name) => {
    const updatedMeals = meals.map((meal) =>
      meal.id === id ? { ...meal, name } : meal
    );
    updateDataForCurrentDate(updatedMeals);
  };

  const recalculateMacros = () => {
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
    const totalFats = meals.reduce((sum, meal) => sum + (meal.fats || 0), 0);

    updateDataForCurrentDate(null, {
      calories: { ...macros.calories, current: totalCalories },
      protein: { ...macros.protein, current: totalProtein },
      carbs: { ...macros.carbs, current: totalCarbs },
      fats: { ...macros.fats, current: totalFats },
    });
  };

  useEffect(() => {
    recalculateMacros();
  }, [meals]);

  const removeMeal = (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    updateDataForCurrentDate(updatedMeals);
  };

  const addMeal = () => {
    const newMeal = {
      id: Date.now(),
      name: "",
      amount: "1 serving",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    };
    updateDataForCurrentDate([...meals, newMeal]);
  };

  const navigateDate = (direction) => {
    const newDate = dayjs(currentDate).add(direction, "day").format("YYYY-MM-DD");
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-black text-white w-full max-w-md mx-auto h-screen flex flex-col">


      {/* Date Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 mt-4">
        <ChevronLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigateDate(-1)}
        />
        <span className="text-xl font-medium">
          {dayjs(currentDate).isSame(dayjs(), "day")
            ? "Today"
            : dayjs(currentDate).format("MMM D, YYYY")}
        </span>
        <ChevronRight
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigateDate(1)}
        />
      </div>

      {/* Macro Tracking */}
      <div className="p-4 space-y-4">
        {Object.entries(macros).map(([key, macro]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>
                {key.charAt(0).toUpperCase() + key.slice(1)} - {macro.current} /{" "}
                {macro.target} {macro.unit}
              </span>
              <span>
                {Math.min(100, ((macro.current / macro.target) * 100).toFixed(0))}%
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div
                className={`h-full rounded-full ${macro.color}`}
                style={{
                  width: `${Math.min(100, (macro.current / macro.target) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Food List */}
      <div className="flex-1 overflow-auto">
        {meals.map((meal) => (
          <div key={meal.id} className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={meal.name}
                onChange={(e) => handleMealChange(meal.id, e.target.value)}
                onBlur={(e) => handleMealBlur(meal.id, e.target.value)}
                className="bg-transparent text-white flex-1 mr-4 focus:outline-none"
                placeholder="Enter food and amount"
              />
              <div className="flex items-center space-x-2">
                <span>{meal.calories} kcal</span>
              </div>
              <button
                onClick={() => removeMeal(meal.id)}
                className="text-red-500 hover:underline text-xs ml-4"
              >
                Remove
              </button>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <div>Protein: {meal.protein}g</div>
              <div>Carbs: {meal.carbs}g</div>
              <div>Fats: {meal.fats}g</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="relative">
        <button
          onClick={addMeal}
          className="absolute bottom-16 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      
    </div>
  );
};

export default NutritionTracker;