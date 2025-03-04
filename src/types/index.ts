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
  date: string;
  weight: number;
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
  defaultSize: number;
  unit: string;
  alternativeUnits?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName?: string;
  text?: string;
  content?: string;
  date: Date | string;
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
  bloodType: BloodType;
  isAdmin: boolean;
  preferences: {
    dietaryRestrictions: string[];
    notifications: {
      mealPrep: boolean;
      shoppingList: boolean;
      mealLogging: boolean;
      weeklyProgress: boolean;
    };
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
  userId: string;
  userName: string;
  title: string;
  description: string;
  mealPlanId: string;
  dateShared: Date;
  comments: Comment[];
  ratings: Rating[];
  averageRating: number;
}

// Food types
export interface Food {
  id: string;
  name: string;
  category: string;
  bloodTypeCompatibility: {
    "A+": Compatibility;
    "A-": Compatibility;
    "B+": Compatibility;
    "B-": Compatibility;
    "AB+": Compatibility;
    "AB-": Compatibility;
    "O+": Compatibility;
    "O-": Compatibility;
  };
  nutritionalInfo: NutritionalInfo;
  description?: string;
  portionInfo?: PortionInfo;
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