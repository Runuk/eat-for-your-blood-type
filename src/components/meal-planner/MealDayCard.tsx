import React, { useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { DailyMeals, MealItem, Food } from '../../types';
import { MealItemCard } from './MealItemCard';
import AddFoodDialog from '../shared/AddFoodDialog';

interface MealDayCardProps {
  day: string;
  meals: DailyMeals;
  onAddMeal: (mealType: keyof DailyMeals, food: Food, portion: number, unit: string) => void;
  onRemoveMeal: (mealType: keyof DailyMeals, mealId: string) => void;
}

export const MealDayCard: React.FC<MealDayCardProps> = ({
  day,
  meals,
  onAddMeal,
  onRemoveMeal
}) => {
  const [addFoodDialogOpen, setAddFoodDialogOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<keyof DailyMeals>('breakfast');
  const mealTypes: (keyof DailyMeals)[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

  const handleAddFood = (food: Food, portion: number, unit: string) => {
    onAddMeal(selectedMealType, food, portion, unit);
    setAddFoodDialogOpen(false);
  };

  const openAddFoodDialog = (mealType: keyof DailyMeals) => {
    setSelectedMealType(mealType);
    setAddFoodDialogOpen(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>{day}</Typography>
      {mealTypes.map((type) => (
        <Box key={type} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {type}
          </Typography>
          {meals[type].map((meal, index) => (
            <MealItemCard
              key={index}
              meal={meal}
              onDelete={() => onRemoveMeal(type, meal.id)}
            />
          ))}
          <Button
            size="small"
            onClick={() => openAddFoodDialog(type)}
            sx={{ mt: 1 }}
          >
            Add {type}
          </Button>
        </Box>
      ))}
      
      <AddFoodDialog
        open={addFoodDialogOpen}
        onClose={() => setAddFoodDialogOpen(false)}
        onAddFood={handleAddFood}
        mealType={selectedMealType}
      />
    </Paper>
  );
}; 