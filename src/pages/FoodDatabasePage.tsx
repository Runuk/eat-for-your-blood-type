import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { foodDatabase } from '../services/foodDatabase';
import { useAuth } from '../context/AuthContext';
import { FoodCategory, Compatibility } from '../types';
import { CompatibilityBadge } from '../components/shared/CompatibilityBadge';

export const FoodDatabasePage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');

  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || food.category === selectedCategory)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Food Database</Typography>
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Foods"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value as FoodCategory | 'all')}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {Object.values(FoodCategory).map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredFoods.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{food.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {food.category}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Blood Type Compatibility:
                  </Typography>
                  <CompatibilityBadge 
                    compatibility={food.bloodTypeCompatibility[user?.bloodType || 'A+']} 
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Nutritional Info (per {food.portionInfo.defaultSize}{food.portionInfo.unit}):
                  </Typography>
                  <Typography variant="body2">
                    Calories: {food.nutritionalInfo.calories}<br />
                    Protein: {food.nutritionalInfo.protein}g<br />
                    Carbs: {food.nutritionalInfo.carbs}g<br />
                    Fats: {food.nutritionalInfo.fats}g
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 