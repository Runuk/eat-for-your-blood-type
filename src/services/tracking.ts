import { User, WeightEntry } from '../types';

export class TrackingService {
  // Add a new weight entry
  static addWeightEntry(user: User, weight: number): User {
    const newEntry: WeightEntry = {
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