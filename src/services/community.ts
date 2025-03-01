import { MealPlan, User, Comment, Rating, SharedMealPlan } from '../types';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  date: Date;
}

export interface Rating {
  userId: string;
  rating: number;
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

// Mock data
const sharedMealPlansData: SharedMealPlan[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Jane Smith',
    title: 'Type A Weekly Plan',
    description: 'A balanced meal plan for blood type A with vegetarian options.',
    mealPlanId: '101',
    dateShared: new Date('2023-02-15'),
    comments: [
      {
        id: '1',
        userId: '3',
        userName: 'Mike Johnson',
        text: 'Great meal plan! I lost 2kg in the first week.',
        date: new Date('2023-02-16')
      },
      {
        id: '2',
        userId: '4',
        userName: 'Sarah Williams',
        text: 'I love the breakfast options. Very tasty!',
        date: new Date('2023-02-17')
      }
    ],
    ratings: [
      { userId: '3', rating: 5 },
      { userId: '4', rating: 4 },
      { userId: '5', rating: 4 }
    ],
    averageRating: 4.3
  },
  {
    id: '2',
    userId: '5',
    userName: 'Robert Brown',
    title: 'Type O Protein-Rich Plan',
    description: 'High protein meal plan optimized for blood type O.',
    mealPlanId: '102',
    dateShared: new Date('2023-02-10'),
    comments: [
      {
        id: '3',
        userId: '2',
        userName: 'Jane Smith',
        text: 'This has been working great for my husband who is type O.',
        date: new Date('2023-02-11')
      }
    ],
    ratings: [
      { userId: '2', rating: 5 },
      { userId: '6', rating: 3 }
    ],
    averageRating: 4.0
  }
];

export const getSharedMealPlans = (): Promise<SharedMealPlan[]> => {
  return Promise.resolve(sharedMealPlansData);
};

export const shareMealPlan = (
  userId: string, 
  userName: string,
  mealPlanId: string, 
  title: string, 
  description: string
): Promise<SharedMealPlan> => {
  const newSharedPlan: SharedMealPlan = {
    id: Date.now().toString(),
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
  
  return Promise.resolve(newSharedPlan);
};

export const addComment = (
  planId: string, 
  userId: string, 
  text: string
): Promise<Comment> => {
  const plan = sharedMealPlansData.find(p => p.id === planId);
  
  if (!plan) {
    return Promise.reject(new Error('Meal plan not found'));
  }
  
  // In a real app, we would fetch the user's name from a user service
  const userName = userId === '1' ? 'Demo User' : 'User ' + userId;
  
  const newComment: Comment = {
    id: Date.now().toString(),
    userId,
    userName,
    text,
    date: new Date()
  };
  
  plan.comments.push(newComment);
  
  return Promise.resolve(newComment);
};

export const rateMealPlan = (
  planId: string, 
  userId: string, 
  rating: number
): Promise<number> => {
  const plan = sharedMealPlansData.find(p => p.id === planId);
  
  if (!plan) {
    return Promise.reject(new Error('Meal plan not found'));
  }
  
  // Remove existing rating by this user if any
  const existingRatingIndex = plan.ratings.findIndex(r => r.userId === userId);
  
  if (existingRatingIndex !== -1) {
    plan.ratings[existingRatingIndex].rating = rating;
  } else {
    plan.ratings.push({ userId, rating });
  }
  
  // Recalculate average rating
  plan.averageRating = plan.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / plan.ratings.length;
  
  return Promise.resolve(plan.averageRating);
};

export const getSharedMealPlanById = (id: string): Promise<SharedMealPlan | undefined> => {
  const plan = sharedMealPlansData.find(p => p.id === id);
  return Promise.resolve(plan);
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
    const newComment = {
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
    const newRating = {
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