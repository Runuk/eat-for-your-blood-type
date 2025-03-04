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
export const getSharedMealPlans = (): Promise<SharedMealPlan[]> => {
  return Promise.resolve(sharedMealPlansData);
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
export const addComment = (
  sharedMealPlanId: string, 
  userId: string, 
  userName: string, 
  content: string
): SharedMealPlan | null => {
  const sharedPlan = sharedMealPlansData.find(plan => plan.id === sharedMealPlanId);
  if (!sharedPlan) return null;
  
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    userId,
    userName,
    content,
    date: new Date()
  };
  
  sharedPlan.comments.push(newComment);
  return sharedPlan;
};

// Rate a shared meal plan
export const rateMealPlan = (
  sharedMealPlanId: string, 
  userId: string, 
  rating: number
): SharedMealPlan | null => {
  const sharedPlan = sharedMealPlansData.find(plan => plan.id === sharedMealPlanId);
  if (!sharedPlan) return null;
  
  // Check if user has already rated this plan
  const existingRatingIndex = sharedPlan.ratings.findIndex(r => r.userId === userId);
  
  if (existingRatingIndex >= 0) {
    // Update existing rating
    sharedPlan.ratings[existingRatingIndex].rating = rating;
  } else {
    // Add new rating
    sharedPlan.ratings.push({
      userId,
      rating,
      date: new Date().toISOString()
    });
  }
  
  // Recalculate average rating
  const sum = sharedPlan.ratings.reduce((acc, r) => acc + (r.rating || 0), 0);
  sharedPlan.averageRating = sum / sharedPlan.ratings.length;
  
  return sharedPlan;
};

// Get a shared meal plan by ID
export const getSharedMealPlanById = (id: string): SharedMealPlan | null => {
  return sharedMealPlansData.find(plan => plan.id === id) || null;
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