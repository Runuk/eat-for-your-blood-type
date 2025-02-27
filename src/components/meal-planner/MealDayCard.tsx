import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { DailyMeals, MealItem } from '../../types';
import { MealItemCard } from './MealItemCard';

interface MealDayCardProps {
  day: string;
  meals: DailyMeals;
  onAddMeal: (mealType: keyof DailyMeals) => void;
  onRemoveMeal: (mealType: keyof DailyMeals, mealIndex: number) => void;
}

export const MealDayCard: React.FC<MealDayCardProps> = ({
  day,
  meals,
  onAddMeal,
  onRemoveMeal
}) => {
  const mealTypes: (keyof DailyMeals)[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

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
              onDelete={() => onRemoveMeal(type, index)}
            />
          ))}
          <Button
            size="small"
            onClick={() => onAddMeal(type)}
            sx={{ mt: 1 }}
          >
            Add {type}
          </Button>
        </Box>
      ))}
    </Paper>
  );
}; 