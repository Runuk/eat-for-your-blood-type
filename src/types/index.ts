// Enums
export enum BloodType {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-'
}

export enum Compatibility {
  Beneficial = 'beneficial',
  Neutral = 'neutral',
  Avoid = 'avoid'
}

export enum FoodCategory {
  Meat = 'meat',
  Fish = 'fish',
  Dairy = 'dairy',
  Vegetables = 'vegetables',
  Fruits = 'fruits',
  Grains = 'grains',
  Legumes = 'legumes',
  Nuts = 'nuts',
  Herbs = 'herbs',
  Spices = 'spices'
}

export enum StoreSection {
  Produce = 'produce',
  Meat = 'meat',
  Dairy = 'dairy',
  Pantry = 'pantry',
  Frozen = 'frozen'
}

// Supporting Interfaces
export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  userId: string;
}

interface NotificationPreferences {
  mealPrep: boolean;
  shoppingList: boolean;
  mealLogging: boolean;
  weeklyProgress: boolean;
  reminderTime?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

export interface PortionInfo {
  unit: string;
  defaultSize?: number;
  alternativeUnits?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  date: Date;
}

export interface Rating {
  userId: string;
  rating?: number;
  score?: number;
  date?: string;
}

export interface DailyMeals {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

export interface MealItem {
  foodId: string;
  portionSize: number;
  portionUnit: string;
  timeToEat?: string;
}

// Core type definitions
export interface User {
  id: string;
  username: string;
  email: string;
  bloodType: BloodType;
  isAdmin: boolean;
  preferences: {
    dietaryRestrictions: string[];
    notifications: NotificationPreferences;
  };
  metrics: {
    complianceRate: number;
    weightHistory: WeightEntry[];
  };
}

export interface Meal {
  id: string;
  name: string;
  foodItems: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
}

export interface MealPlan {
  id: string;
  userId: string;
  title: string;
  isPublic: boolean;
  weeklyPlans: {
    [weekId: string]: {
      [dayId: string]: DailyMeals;
    };
  };
  ratings: Rating[];
  comments: Comment[];
  startDate: Date;
  endDate: Date;
  meals: Meal[];
}

export interface SharedMealPlan {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
  dateShared: Date;
  comments: Comment[];
  ratings: Array<{
    userId: string;
    rating: number;
  }>;
  averageRating: number;
}

// Food types
export interface Food {
  id: string;
  name: string;
  category: string;
  bloodTypeCompatibility: {
    [key in BloodType]: Compatibility;
  };
  nutritionalInfo: NutritionalInfo;
  description?: string;
  portionInfo?: {
    unit: string;
    defaultSize?: number;
    alternativeUnits?: string[];
  };
  storeSection?: string;
}

export type CompatibilityStatus = 'beneficial' | 'neutral' | 'avoid';

export interface Herb {
  id: string;
  name: string;
  healingProperties: string[];
  bloodTypeCompatibility: {
    [key in BloodType]: Compatibility;
  };
  dosageInfo?: string;
  detailedDescription: string;
  shortDescription: string;
} 