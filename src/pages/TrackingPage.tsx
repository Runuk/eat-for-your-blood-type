import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, LinearProgress } from '@mui/material';
import { WeightChart } from '../components/tracking/WeightChart';
import { TrackingService } from '../services/tracking';
import { useAuth } from '../context/AuthContext';

export const TrackingPage = () => {
  const { user, updateUser } = useAuth();
  const [newWeight, setNewWeight] = useState('');

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (!isNaN(weight) && user) {
      const updatedUser = TrackingService.addWeightEntry(user, weight);
      updateUser(updatedUser);
      setNewWeight('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Progress Tracking</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Diet Compliance</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={user?.metrics.complianceRate || 0}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Typography variant="body2">
                {Math.round(user?.metrics.complianceRate || 0)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Weight Progress</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="Weight (kg)"
                  type="number"
                  size="small"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
                <Button 
                  variant="contained"
                  onClick={handleAddWeight}
                  disabled={!newWeight}
                >
                  Add Entry
                </Button>
              </Box>
            </Box>
            
            <WeightChart data={user?.metrics.weightHistory || []} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 