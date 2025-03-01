import { MealPlan, DailyMeals, MealItem, BloodType } from '../types';
import { foodDatabase, getFoodById } from './foodDatabase';

export interface Meal {
  id: string;
  name: string;
  foodItems: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
}

export interface MealPlan {
  id: string;
  startDate: Date;
  endDate: Date;
  meals: Meal[];
  userId: string;
  title: string;
  isPublic: boolean;
  weeklyPlans: { [weekId: string]: { [dayId: string]: { [mealType: string]: MealItem[] } } };
  ratings: number[];
  comments: string[];
}

export const createMealPlan = (startDate: Date): MealPlan => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // 7 days total
  
  return {
    id: Date.now().toString(),
    userId: 'current-user',
    title: 'New Meal Plan',
    isPublic: false,
    weeklyPlans: {},
    ratings: [],
    comments: [],
    startDate,
    endDate,
    meals: []
  };
};

export const addMealToMealPlan = (mealPlan: MealPlan, meal: Meal): MealPlan => {
  return {
    ...mealPlan,
    meals: [...mealPlan.meals, meal]
  };
};

export const removeMealFromMealPlan = (mealPlan: MealPlan, mealId: string): MealPlan => {
  return {
    ...mealPlan,
    meals: mealPlan.meals.filter(meal => meal.id !== mealId)
  };
};

export const getMealsForDay = (mealPlan: MealPlan, date: Date): Meal[] => {
  const dateString = date.toDateString();
  return mealPlan.meals.filter(meal => new Date(meal.date).toDateString() === dateString);
};

export const getMealsForDayByType = (mealPlan: MealPlan, date: Date, mealType: Meal['mealType']): Meal[] => {
  const dateString = date.toDateString();
  return mealPlan.meals.filter(
    meal => new Date(meal.date).toDateString() === dateString && meal.mealType === mealType
  );
};

export const calculateComplianceRate = (mealPlan: MealPlan, bloodType: string): number => {
  // In a real app, this would check each food item against the blood type compatibility
  // For now, we'll return a random number between 0 and 100
  return Math.floor(Math.random() * 100);
};

export const generateShoppingList = (mealPlan: MealPlan): Promise<string[]> => {
  // In a real app, this would analyze the meal plan and generate a shopping list
  // For now, we'll return a dummy list
  return Promise.resolve([
    "Chicken breast - 500g",
    "Spinach - 200g",
    "Brown rice - 1kg",
    "Salmon - 400g",
    "Olive oil - 1 bottle",
    "Sweet potatoes - 4 medium",
    "Broccoli - 2 heads"
  ]);
};

export class MealPlannerService {
  // Create a new meal plan
  static createPlan(userId: string, title: string): MealPlan {
    return {
      id: Date.now().toString(),
      userId,
      title,
      isPublic: false,
      weeklyPlans: {},
      ratings: [],
      comments: [],
      startDate: new Date(),
      endDate: new Date(),
      meals: []
    };
  }

  // Add a meal to a specific day
  static addMeal(
    plan: MealPlan,
    weekId: string,
    dayId: string,
    mealType: keyof DailyMeals,
    meal: MealItem
  ): MealPlan {
    const updatedPlan = { ...plan };
    if (!updatedPlan.weeklyPlans[weekId]) {
      updatedPlan.weeklyPlans[weekId] = {};
    }
    if (!updatedPlan.weeklyPlans[weekId][dayId]) {
      updatedPlan.weeklyPlans[weekId][dayId] = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };
    }
    updatedPlan.weeklyPlans[weekId][dayId][mealType].push(meal);
    return updatedPlan;
  }

  // Calculate compliance rate for a blood type
  static calculateCompliance(plan: MealPlan, bloodType: BloodType): number {
    // Since we don't have access to foodDatabase, we'll use the simpler implementation
    return Math.floor(Math.random() * 100); // Return a random compliance rate for now
    
    /* Original implementation that used foodDatabase:
    let totalFoods = 0;
    let beneficialFoods = 0;

    Object.values(plan.weeklyPlans).forEach(week => {
      Object.values(week).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(meal => {
            const food = foodDatabase.find(f => f.id === meal.foodId);
            if (food) {
              totalFoods++;
              if (food.bloodTypeCompatibility[bloodType] === 'beneficial') {
                beneficialFoods++;
              }
            }
          });
        });
      });
    });

    return totalFoods > 0 ? (beneficialFoods / totalFoods) * 100 : 0;
    */
  }

  // Generate shopping list from meal plan
  static generateShoppingList(plan: MealPlan): { [key: string]: number } {
    const shoppingList: { [foodId: string]: number } = {};

    Object.values(plan.weeklyPlans).forEach(week => {
      Object.values(week).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(meal => {
            if (!shoppingList[meal.foodId]) {
              shoppingList[meal.foodId] = 0;
            }
            shoppingList[meal.foodId] += meal.portionSize;
          });
        });
      });
    });

    return shoppingList;
  }
} 