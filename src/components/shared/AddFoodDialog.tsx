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
  ListItemSecondaryAction,
  InputAdornment,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CompatibilityBadge } from './CompatibilityBadge';
import { useAuth } from '../../context/AuthContext';
import { Food } from '../../types';
import { searchFoods, getAllCategories } from '../../services/foodDatabase';

interface AddFoodDialogProps {
  open: boolean;
  onClose: () => void;
  onAddFood: (food: Food, portion: number, portionUnit: string) => void;
}

export const AddFoodDialog: React.FC<AddFoodDialogProps> = ({ open, onClose, onAddFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [portion, setPortion] = useState(1);
  const [portionUnit, setPortionUnit] = useState('serving');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim().length > 0) {
        try {
          const results = await searchFoods(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching foods:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };
    
    performSearch();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setPortion(1);
  };

  const handlePortionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPortion(isNaN(value) ? 0 : value);
  };

  const handlePortionUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortionUnit(event.target.value);
  };

  const handleAddFood = () => {
    if (selectedFood && portion > 0) {
      onAddFood(selectedFood, portion, portionUnit);
      setSelectedFood(null);
      setPortion(1);
      setPortionUnit('serving');
      setSearchTerm('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedFood(null);
    setPortion(1);
    setPortionUnit('serving');
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Food to Meal</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search Foods"
            value={searchTerm}
            onChange={handleSearchChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="category-select-label">Filter by Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange as any}
              label="Filter by Category"
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        {searchResults.length > 0 ? (
          <List>
            {searchResults.map((food) => (
              <React.Fragment key={food.id}>
                <ListItem button onClick={() => handleSelectFood(food)}>
                  <ListItemText 
                    primary={food.name} 
                    secondary={`${food.nutritionalInfo.calories} cal | ${food.nutritionalInfo.protein}g protein`} 
                  />
                  <ListItemSecondaryAction>
                    {user && (
                      <CompatibilityBadge 
                        compatibility={food.bloodTypeCompatibility[user.bloodType]} 
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : searchTerm ? (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ my: 2 }}>
            No foods found matching your search.
          </Typography>
        ) : null}
        
        {selectedFood && (
          <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="h6">{selectedFood.name}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {selectedFood.category}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2">
                Calories: {selectedFood.nutritionalInfo.calories} cal
              </Typography>
              <Typography variant="body2">
                Protein: {selectedFood.nutritionalInfo.protein}g
              </Typography>
              <Typography variant="body2">
                Carbs: {selectedFood.nutritionalInfo.carbs}g
              </Typography>
              <Typography variant="body2">
                Fat: {selectedFood.nutritionalInfo.fat}g
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Portion Size"
                type="number"
                value={portion}
                onChange={handlePortionChange}
                margin="normal"
                variant="outlined"
                fullWidth
                inputProps={{ min: 0.25, step: 0.25 }}
              />
              <TextField
                label="Unit"
                value={portionUnit}
                onChange={handlePortionUnitChange}
                margin="normal"
                variant="outlined"
                fullWidth
                placeholder="e.g., serving, g, oz"
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleAddFood} 
          color="primary" 
          disabled={!selectedFood || portion <= 0}
        >
          Add to Meal
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 