// User types
export type BloodType = 'A' | 'B' | 'AB' | 'O';

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  metrics: {
    weightHistory: WeightEntry[];
    complianceRate: number;
  };
}

// Food types
export interface Food {
  id: string;
  name: string;
  category: string;
  bloodTypeCompatibility: {
    A: CompatibilityStatus;
    B: CompatibilityStatus;
    AB: CompatibilityStatus;
    O: CompatibilityStatus;
  };
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  description?: string;
}

export type CompatibilityStatus = 'beneficial' | 'neutral' | 'avoid';

// Meal planning types
export interface MealItem {
  id: string;
  foodId: string;
  portionSize: number;
}

export interface DailyMeals {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
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

export interface Meal {
  id: string;
  name: string;
  foodItems: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
}

// Tracking types
export interface WeightEntry {
  id?: string;
  userId?: string;
  weight: number;
  date: Date | string;
}

// Community types
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