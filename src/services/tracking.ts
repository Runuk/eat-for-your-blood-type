import { User, WeightEntry } from '../types';

interface UserTracking {
  userId: string;
  weightEntries: WeightEntry[];
  complianceRate: number;
}

// Mock data
const trackingData: UserTracking[] = [
  {
    userId: '1',
    weightEntries: [
      { id: '1', userId: '1', weight: 75, date: '2023-01-01' },
      { id: '2', userId: '1', weight: 74.5, date: '2023-01-08' },
      { id: '3', userId: '1', weight: 73.8, date: '2023-01-15' },
      { id: '4', userId: '1', weight: 73.2, date: '2023-01-22' },
      { id: '5', userId: '1', weight: 72.5, date: '2023-01-29' }
    ],
    complianceRate: 78
  }
];

// Helper function to find or create user tracking data
const getUserTracking = (userId: string): UserTracking => {
  const userTracking = trackingData.find(tracking => tracking.userId === userId);
  
  if (userTracking) {
    return userTracking;
  }
  
  const newTracking: UserTracking = {
    userId,
    weightEntries: [],
    complianceRate: 0
  };
  
  trackingData.push(newTracking);
  return newTracking;
};

export const addWeightEntry = async (userId: string, weight: number): Promise<WeightEntry> => {
  const newEntry: WeightEntry = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    date: new Date().toISOString(),
    weight
  };
  const userTracking = getUserTracking(userId);
  userTracking.weightEntries.push(newEntry);
  return newEntry;
};

export const getWeightHistory = async (userId: string): Promise<WeightEntry[]> => {
  const userTracking = getUserTracking(userId);
  return userTracking.weightEntries;
};

export const updateComplianceRate = async (userId: string, rate: number): Promise<number> => {
  const userTracking = getUserTracking(userId);
  userTracking.complianceRate = rate;
  return rate;
};

export const getComplianceRate = async (userId: string): Promise<number> => {
  const userTracking = getUserTracking(userId);
  return userTracking.complianceRate;
};

export class TrackingService {
  // Add a new weight entry
  static addWeightEntry(user: User, weight: number): User {
    const newEntry: WeightEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: new Date().toISOString(),
      weight
    };

    return {
      ...user,
      metrics: {
        ...user.metrics,
        weightHistory: [...user.metrics.weightHistory, newEntry]
      }
    };
  }

  // Update compliance rate
  static updateComplianceRate(user: User, complianceRate: number): User {
    return {
      ...user,
      metrics: {
        ...user.metrics,
        complianceRate
      }
    };
  }

  // Get weight history for a date range
  static getWeightHistory(user: User, startDate: Date, endDate: Date): WeightEntry[] {
    return user.metrics.weightHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }
} 