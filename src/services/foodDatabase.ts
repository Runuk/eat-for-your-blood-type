import { Food, CompatibilityStatus } from '../types';

// Mock food database
export const foodDatabase: Food[] = [
  {
    id: '1',
    name: 'Chicken',
    category: 'Meat',
    bloodTypeCompatibility: {
      A: 'neutral',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    nutritionalInfo: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    },
    description: 'Lean protein source, best when organic and free-range.'
  },
  {
    id: '2',
    name: 'Spinach',
    category: 'Vegetables',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    nutritionalInfo: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4
    },
    description: 'Nutrient-rich leafy green vegetable high in iron and antioxidants.'
  },
  {
    id: '3',
    name: 'Wheat',
    category: 'Grains',
    bloodTypeCompatibility: {
      A: 'neutral',
      B: 'avoid',
      AB: 'neutral',
      O: 'avoid'
    },
    nutritionalInfo: {
      calories: 340,
      protein: 13,
      carbs: 71,
      fat: 2.5
    },
    description: 'Common grain, often problematic for blood types O and B.'
  },
  {
    id: '4',
    name: 'Salmon',
    category: 'Fish',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    nutritionalInfo: {
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13
    },
    description: 'Excellent source of omega-3 fatty acids and high-quality protein.'
  },
  {
    id: '5',
    name: 'Lentils',
    category: 'Legumes',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'neutral',
      AB: 'beneficial',
      O: 'avoid'
    },
    nutritionalInfo: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4
    },
    description: 'High in protein and fiber, excellent for blood types A and AB.'
  }
];

// Get all foods
export const getAllFoods = (): Promise<Food[]> => {
  return Promise.resolve(foodDatabase);
};

// Get food by ID
export const getFoodById = (id: string): Promise<Food | undefined> => {
  const food = foodDatabase.find(f => f.id === id);
  return Promise.resolve(food);
};

// Get foods by category
export const getFoodsByCategory = (category: string): Promise<Food[]> => {
  const foods = foodDatabase.filter(f => f.category === category);
  return Promise.resolve(foods);
};

// Get foods by compatibility for a blood type
export const getFoodsByCompatibility = (
  bloodType: string, 
  compatibility: CompatibilityStatus
): Promise<Food[]> => {
  const foods = foodDatabase.filter(
    f => f.bloodTypeCompatibility[bloodType as keyof typeof f.bloodTypeCompatibility] === compatibility
  );
  return Promise.resolve(foods);
};

// Search foods by name
export const searchFoods = (query: string): Promise<Food[]> => {
  const foods = foodDatabase.filter(
    f => f.name.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(foods);
};

// Get all food categories
export const getAllCategories = (): Promise<string[]> => {
  const categories = Array.from(new Set(foodDatabase.map(f => f.category)));
  return Promise.resolve(categories);
}; 