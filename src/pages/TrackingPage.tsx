import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  LinearProgress
} from '@mui/material';
import { addWeightEntry, getWeightHistory, getComplianceRate } from '../services/tracking';
import { WeightChart } from '../components/tracking/WeightChart';
import { useAuth } from '../context/AuthContext';
import { WeightEntry } from '../types';

const TrackingPage: React.FC = () => {
  const { user } = useAuth();
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [complianceRate, setComplianceRate] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const entries = await getWeightHistory(user.id);
        setWeightEntries(entries);
        
        const compliance = await getComplianceRate(user.id);
        setComplianceRate(compliance);
      }
    };
    
    loadData();
  }, [user]);

  const handleAddWeight = async () => {
    if (!newWeight || isNaN(parseFloat(newWeight))) {
      setError('Please enter a valid weight');
      return;
    }
    
    if (user) {
      const weight = parseFloat(newWeight);
      const newEntry = await addWeightEntry(user.id, weight);
      setWeightEntries([...weightEntries, newEntry]);
      setOpenDialog(false);
      setNewWeight('');
      setError('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Progress Tracking</Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Diet Compliance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={complianceRate} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(complianceRate)}%`}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {complianceRate >= 80 
            ? 'Excellent! You\'re following your blood type diet very well.' 
            : complianceRate >= 60 
              ? 'Good progress! Try to increase your compliance for better results.' 
              : 'You can improve your compliance to see better results.'}
        </Typography>
      </Paper>
      
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Weight Progress</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
        >
          Add Weight Entry
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, height: 300 }}>
        {weightEntries.length > 0 ? (
          <WeightChart data={weightEntries} />
        ) : (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">No weight entries yet. Add your first entry!</Typography>
          </Box>
        )}
      </Paper>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Weight Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Weight (kg)"
            type="number"
            fullWidth
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddWeight} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrackingPage; 