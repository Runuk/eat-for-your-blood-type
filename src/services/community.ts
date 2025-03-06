import { MealPlan, User, Comment, Rating, SharedMealPlan } from '../types';

// Mock data
const sharedMealPlansData: SharedMealPlan[] = [
  {
    id: 'smp-1',
    userId: 'user-1',
    userName: 'John Doe',
    title: 'Type A Optimal Weekly Plan',
    description: 'A balanced meal plan optimized for Type A blood types with focus on plant-based proteins.',
    mealPlanId: 'mp-1',
    dateShared: new Date('2023-05-15'),
    comments: [
      {
        id: 'comment-1',
        userId: 'user-2',
        userName: 'Jane Smith',
        content: 'This meal plan has been amazing for my energy levels!',
        date: new Date('2023-05-16')
      }
    ],
    ratings: [
      {
        userId: 'user-2',
        rating: 5,
        date: '2023-05-16'
      },
      {
        userId: 'user-3',
        rating: 4,
        date: '2023-05-17'
      }
    ],
    averageRating: 4.5
  },
  {
    id: 'smp-2',
    userId: 'user-3',
    userName: 'Mike Johnson',
    title: 'Type O Performance Plan',
    description: 'High-protein meal plan designed for Type O individuals with active lifestyles.',
    mealPlanId: 'mp-2',
    dateShared: new Date('2023-05-10'),
    comments: [],
    ratings: [
      {
        userId: 'user-1',
        rating: 4,
        date: '2023-05-11'
      }
    ],
    averageRating: 4
  }
];

// Get all shared meal plans
export const getSharedMealPlans = async (): Promise<SharedMealPlan[]> => {
  // Mock implementation
  return [];
};

// Share a meal plan
export const shareMealPlan = (
  userId: string, 
  userName: string,
  mealPlanId: string, 
  title: string, 
  description: string
): SharedMealPlan => {
  const newSharedPlan: SharedMealPlan = {
    id: `smp-${Date.now()}`,
    userId,
    userName,
    title,
    description,
    mealPlanId,
    dateShared: new Date(),
    comments: [],
    ratings: [],
    averageRating: 0
  };
  
  sharedMealPlansData.push(newSharedPlan);
  return newSharedPlan;
};

// Add a comment to a shared meal plan
export const addComment = async (
  planId: string,
  userId: string,
  content: string,
  username: string
): Promise<Comment> => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    content,
    userName: username,
    date: new Date()
  } as Comment & { userName: string };
};

// Rate a shared meal plan
export const rateMealPlan = async (
  planId: string,
  userId: string,
  rating: number
): Promise<Rating> => {
  return {
    userId,
    rating,
    date: new Date().toISOString()
  };
};

// Get a shared meal plan by ID
export const getSharedMealPlanById = async (id: string): Promise<SharedMealPlan | null> => {
  return null;
};

export class CommunityService {
  // Share a meal plan
  static shareMealPlan(plan: MealPlan): MealPlan {
    return {
      ...plan,
      isPublic: true
    };
  }

  // Add a comment to a meal plan
  static addComment(plan: MealPlan, user: User, content: string): MealPlan {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      content,
      date: new Date().toISOString()
    };

    return {
      ...plan,
      comments: [...plan.comments, newComment]
    };
  }

  // Rate a meal plan
  static ratePlan(plan: MealPlan, userId: string, score: number): MealPlan {
    const newRating: Rating = {
      userId,
      score,
      date: new Date().toISOString()
    };

    return {
      ...plan,
      ratings: [...plan.ratings, newRating]
    };
  }

  // Get shared meal plans
  static getSharedPlans(): MealPlan[] {
    // In a real app, this would fetch from a database
    return [];
  }
} 