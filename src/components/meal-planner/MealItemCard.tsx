import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MealItem } from '../../types';
import { foodDatabase } from '../../services/foodDatabase';

interface MealItemCardProps {
  meal: MealItem;
  onDelete: () => void;
}

export const MealItemCard: React.FC<MealItemCardProps> = ({ meal, onDelete }) => {
  const food = foodDatabase.find(f => f.id === meal.foodId);

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            {food?.name} - {meal.portionSize}{meal.portionUnit}
          </Typography>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}; 