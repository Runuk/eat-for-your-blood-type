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

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

interface PortionInfo {
  defaultSize: number;
  unit: string;
  alternativeUnits?: string[];
}

interface Rating {
  userId: string;
  score: number;
  date: string;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  date: string;
  likes?: number;
}

interface DailyMeals {
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
}

export interface Food {
  id: string;
  name: string;
  barcode?: string;
  category: FoodCategory;
  bloodTypeCompatibility: {
    [key in BloodType]: Compatibility;
  };
  nutritionalInfo: NutritionalInfo;
  portionInfo: PortionInfo;
  storeSection: StoreSection;
}

interface Herb {
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