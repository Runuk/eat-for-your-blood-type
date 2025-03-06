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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Food, CompatibilityStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { searchFoods } from '../../services/foodDatabase';
import { CompatibilityBadge } from './CompatibilityBadge';

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
  const [portion, setPortion] = useState(1);
  const [unit, setUnit] = useState('serving');
  const { user } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() !== '') {
        const results = await searchFoods(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
    fetchResults();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    if (food.portionInfo?.unit) {
      setUnit(food.portionInfo.unit);
      setPortion(food.portionInfo.defaultSize || 1);
    } else {
      setUnit('serving');
      setPortion(1);
    }
  };

  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood, portion, unit);
      onClose();
      setSelectedFood(null);
      setPortion(1);
      setUnit('serving');
    }
  };

  const getCompatibilityForBloodType = (food: Food): CompatibilityStatus => {
    if (!user || !food.bloodTypeCompatibility) return 'neutral';
    
    // Convert Compatibility enum value to CompatibilityStatus
    const bloodTypeKey = user.bloodType.toString() as keyof typeof food.bloodTypeCompatibility;
    const compatValue = food.bloodTypeCompatibility[bloodTypeKey];
    
    if (compatValue === 'beneficial') return 'beneficial';
    if (compatValue === 'avoid') return 'avoid';
    return 'neutral';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        <IconButton
          aria-label="close"
          onClick={onClose}
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
                  <Typography variant="body2">Fat: {selectedFood.nutritionalInfo.fat}g</Typography>
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
                  onChange={(e) => setPortion(parseFloat(e.target.value) || 0)}
                  inputProps={{ min: 0, step: 0.5 }}
                  sx={{ width: 100 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={unit}
                    label="Unit"
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <MenuItem value={selectedFood.portionInfo?.unit || 'serving'}>
                      {selectedFood.portionInfo?.unit || 'serving'}
                    </MenuItem>
                    {selectedFood.portionInfo?.alternativeUnits?.map((altUnit) => (
                      <MenuItem key={altUnit} value={altUnit}>
                        {altUnit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
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