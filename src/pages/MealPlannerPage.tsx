import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { createMealPlan } from '../services/mealPlanner';

const MealPlannerPage: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [mealPlan, setMealPlan] = useState(createMealPlan(new Date()));

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meal Planner
      </Typography>

      <Grid container spacing={2}>
        {daysOfWeek.map((day) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {day}
              </Typography>
              
              {mealTypes.map((mealType) => (
                <Box key={mealType} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {mealType}
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 1, 
                      minHeight: 50, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.default'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      + Add {mealType}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MealPlannerPage; 