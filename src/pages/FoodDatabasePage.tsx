import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { CompatibilityBadge } from '../components/shared/CompatibilityBadge';
import { useAuth } from '../context/AuthContext';
import { Food } from '../types';
import { getAllFoods, getAllCategories, getFoodsByCategory, searchFoods } from '../services/foodDatabase';

const FoodDatabasePage: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allFoods = await getAllFoods();
        const allCategories = await getAllCategories();
        
        setFoods(allFoods);
        setFilteredFoods(allFoods);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const filterFoods = async () => {
      try {
        let result: Food[] = [];
        
        if (searchTerm) {
          result = await searchFoods(searchTerm);
        } else if (selectedCategory) {
          result = await getFoodsByCategory(selectedCategory);
        } else {
          result = await getAllFoods();
        }
        
        setFilteredFoods(result);
      } catch (error) {
        console.error('Error filtering foods:', error);
      }
    };
    
    filterFoods();
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedCategory('');
  };

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { getFoods, Food } from '../services/foodDatabase';
import { useAuth } from '../context/AuthContext';
import { CompatibilityBadge } from '../components/shared/CompatibilityBadge';

const FoodDatabasePage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foods, setFoods] = useState<Food[]>([]);
  
  useEffect(() => {
    const loadFoods = async () => {
      const foodData = await getFoods();
      setFoods(foodData);
    };
    
    loadFoods();
  }, []);

  const categories = ['all', 'vegetables', 'fruits', 'meats', 'fish', 'dairy', 'grains', 'nuts', 'legumes'];

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Food Database</Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Search Foods"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
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
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {food.category.charAt(0).toUpperCase() + food.category.slice(1)}
                </Typography>
                
                <Box sx={{ mt: 2, mb: 2 }}>
                  <CompatibilityBadge 
                    compatibility={food.bloodTypeCompatibility[user?.bloodType || 'A']} 
                  />
                </Box>
                
                <Typography variant="body2">
                  <strong>Calories:</strong> {food.nutritionalInfo.calories} kcal
                </Typography>
                <Typography variant="body2">
                  <strong>Protein:</strong> {food.nutritionalInfo.protein}g
                </Typography>
                <Typography variant="body2">
                  <strong>Carbs:</strong> {food.nutritionalInfo.carbs}g
                </Typography>
                <Typography variant="body2">
                  <strong>Fat:</strong> {food.nutritionalInfo.fat}g
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodDatabasePage; 