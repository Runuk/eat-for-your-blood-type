import { Food, BloodType, Compatibility, FoodCategory, StoreSection } from '../types';

// Mock food database
export const foodDatabase: Food[] = [
  {
    id: '1',
    name: 'Spinach',
    category: FoodCategory.Vegetables,
    bloodTypeCompatibility: {
      [BloodType.APositive]: Compatibility.Beneficial,
      [BloodType.ANegative]: Compatibility.Beneficial,
      [BloodType.BPositive]: Compatibility.Beneficial,
      [BloodType.BNegative]: Compatibility.Beneficial,
      [BloodType.ABPositive]: Compatibility.Beneficial,
      [BloodType.ABNegative]: Compatibility.Beneficial,
      [BloodType.OPositive]: Compatibility.Beneficial,
      [BloodType.ONegative]: Compatibility.Beneficial,
    },
    nutritionalInfo: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
    },
    portionInfo: {
      defaultSize: 100,
      unit: 'g',
    },
    storeSection: StoreSection.Produce,
  },
  // Add more foods...
]; 