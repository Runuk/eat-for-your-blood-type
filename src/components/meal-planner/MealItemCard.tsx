import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MealItem, Food } from '../../types';
import { getFoodById } from '../../services/foodDatabase';

interface MealItemCardProps {
  meal: MealItem;
  onDelete: () => void;
}

export const MealItemCard: React.FC<MealItemCardProps> = ({ meal, onDelete }) => {
  const [food, setFood] = useState<Food | null>(null);

  useEffect(() => {
    const loadFood = async () => {
      try {
        const foodData = await getFoodById(meal.foodId);
        if (foodData) {
          setFood(foodData);
        }
      } catch (error) {
        console.error('Error loading food:', error);
      }
    };

    loadFood();
  }, [meal.foodId]);

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            {food?.name} - {meal.portionSize}{meal.portionUnit || ''}
          </Typography>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}; 