import { MealPlan, User } from '../types';

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