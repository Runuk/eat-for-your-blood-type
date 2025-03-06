// This file should be deleted as its contents have been moved to community.ts 

import { SharedMealPlan, Comment, Rating, User } from '../types';

export const getSharedMealPlans = async (): Promise<SharedMealPlan[]> => {
  // Mock implementation
  return [];
};

export const shareMealPlan = async (
  userId: string,
  mealPlanId: string,
  title: string,
  description: string
): Promise<SharedMealPlan> => {
  // Mock implementation
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    userName: 'User Name', // This would come from actual user data
    title,
    description,
    mealPlanId,
    dateShared: new Date(),
    comments: [],
    ratings: [],
    averageRating: 0
  };
};

export const addComment = async (
  planId: string,
  userId: string,
  content: string,
  userName: string
): Promise<Comment> => {
  // Mock implementation
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    userName,
    content,
    date: new Date()
  };
};

export const rateMealPlan = async (
  planId: string,
  userId: string,
  rating: number
): Promise<Rating> => {
  // Mock implementation
  return {
    userId,
    rating,
    date: new Date().toISOString()
  };
};

export const getSharedMealPlanById = async (planId: string): Promise<SharedMealPlan | null> => {
  // Mock implementation
  return null;
}; 