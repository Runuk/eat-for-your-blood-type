import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Food, CompatibilityStatus, Compatibility } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { searchFoods } from '../../services/foodDatabase';
import CompatibilityBadge from './CompatibilityBadge';

interface AddFoodDialogProps {
  open: boolean;
  onClose: () => void;
  onAddFood: (food: Food, portion: number, unit: string) => void;
  mealType: string;
}

const AddFoodDialog: React.FC<AddFoodDialogProps> = ({
  open,
  onClose,
  onAddFood,
  mealType
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [portion, setPortion] = useState<number>(1);
  const [unit, setUnit] = useState<string>('serving');
  const { user } = useAuth();

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const results = searchFoods(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    // Set default unit from food's portionInfo if available
    if (food.portionInfo) {
      setUnit(food.portionInfo.unit);
      setPortion(food.portionInfo.defaultSize);
    }
  };

  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood, portion, unit);
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedFood(null);
    setPortion(1);
    setUnit('serving');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getCompatibilityForBloodType = (food: Food): CompatibilityStatus => {
    if (!user || !food.bloodTypeCompatibility) return 'neutral';
    
    // Convert Compatibility enum value to CompatibilityStatus
    const bloodTypeKey = user.bloodType.toString() as keyof typeof food.bloodTypeCompatibility;
    const compatValue = food.bloodTypeCompatibility[bloodTypeKey];
    
    if (compatValue === Compatibility.Beneficial) return 'beneficial';
    if (compatValue === Compatibility.Avoid) return 'avoid';
    return 'neutral';
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search for foods"
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {!selectedFood ? (
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {searchResults.length > 0 ? (
              searchResults.map((food) => (
                <ListItem 
                  key={food.id} 
                  button 
                  onClick={() => handleSelectFood(food)}
                  divider
                >
                  <ListItemText 
                    primary={food.name} 
                    secondary={food.category} 
                  />
                  <CompatibilityBadge 
                    compatibility={getCompatibilityForBloodType(food)} 
                  />
                </ListItem>
              ))
            ) : (
              searchQuery.trim() !== '' && (
                <ListItem>
                  <ListItemText primary="No foods found" />
                </ListItem>
              )
            )}
          </List>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              {selectedFood.name}
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Nutritional Information</Typography>
                  <Typography variant="body2">Calories: {selectedFood.nutritionalInfo.calories} kcal</Typography>
                  <Typography variant="body2">Protein: {selectedFood.nutritionalInfo.protein}g</Typography>
                  <Typography variant="body2">Carbs: {selectedFood.nutritionalInfo.carbs}g</Typography>
                  <Typography variant="body2">Fat: {selectedFood.nutritionalInfo.fats}g</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Blood Type Compatibility</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      For your blood type ({user?.bloodType}):
                    </Typography>
                    <CompatibilityBadge 
                      compatibility={getCompatibilityForBloodType(selectedFood)} 
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  label="Portion Size"
                  type="number"
                  value={portion}
                  onChange={(e) => setPortion(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0.1, step: 0.1 } }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleAddFood} 
          color="primary" 
          disabled={!selectedFood}
        >
          Add to Meal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFoodDialog; 