import { MealPlan, Meal, BloodType, Food } from '../types';
import { getFoodById } from './foodDatabase';

// Mock data
const mealPlansData: MealPlan[] = [];

// Helper function to create a new meal plan
export const createMealPlan = (userId: string, title: string): MealPlan => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7); // One week meal plan
  
  const newMealPlan: MealPlan = {
    id: `mp-${Date.now()}`,
    userId,
    title,
    isPublic: false,
    weeklyPlans: {},
    ratings: [],
    comments: [],
    startDate,
    endDate,
    meals: []
  };
  
  mealPlansData.push(newMealPlan);
  return newMealPlan;
};

// Add a meal to a meal plan
export const addMealToMealPlan = (mealPlanId: string, meal: Meal): MealPlan | null => {
  const mealPlan = mealPlansData.find(mp => mp.id === mealPlanId);
  if (!mealPlan) return null;
  
  mealPlan.meals.push(meal);
  return mealPlan;
};

// Remove a meal from a meal plan
export const removeMealFromMealPlan = (mealPlanId: string, mealId: string): MealPlan | null => {
  const mealPlan = mealPlansData.find(mp => mp.id === mealPlanId);
  if (!mealPlan) return null;
  
  mealPlan.meals = mealPlan.meals.filter(meal => meal.id !== mealId);
  return mealPlan;
};

// Get meals for a specific date
export const getMealsForDay = (mealPlanId: string, date: Date): Meal[] => {
  const mealPlan = mealPlansData.find(mp => mp.id === mealPlanId);
  if (!mealPlan) return [];
  
  const dateString = date.toISOString().split('T')[0];
  return mealPlan.meals.filter(meal => {
    const mealDate = new Date(meal.date);
    return mealDate.toISOString().split('T')[0] === dateString;
  });
};

// Get meals for a specific date and meal type
export const getMealsForDayByType = (mealPlanId: string, date: Date, mealType: string): Meal[] => {
  const meals = getMealsForDay(mealPlanId, date);
  return meals.filter(meal => meal.mealType === mealType);
};

// Calculate compliance rate based on blood type compatibility
export const calculateComplianceRate = (mealPlanId: string, bloodType: BloodType): number => {
  // In a real app, this would check each food's compatibility with the user's blood type
  // For demo purposes, we'll return a random compliance rate
  return Math.floor(Math.random() * 41) + 60; // Random number between 60-100
};

// Generate a shopping list based on meal plan
export const generateShoppingList = (mealPlanId: string): { item: string; quantity: number; unit: string }[] => {
  // In a real app, this would aggregate all food items and their quantities
  // For demo purposes, we'll return a dummy shopping list
  return [
    { item: 'Chicken breast', quantity: 2, unit: 'lbs' },
    { item: 'Spinach', quantity: 1, unit: 'bunch' },
    { item: 'Sweet potatoes', quantity: 3, unit: 'medium' },
    { item: 'Olive oil', quantity: 1, unit: 'bottle' },
    { item: 'Quinoa', quantity: 2, unit: 'cups' }
  ];
}; 