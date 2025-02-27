import { MealPlan, DailyMeals, MealItem, BloodType, Food } from '../types';
import { foodDatabase } from './foodDatabase';

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
      comments: []
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