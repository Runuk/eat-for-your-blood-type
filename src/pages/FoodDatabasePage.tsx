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
  Paper,
  SelectChangeEvent
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

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    setSearchTerm('');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Food Database
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Foods"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-select-label">Filter by Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
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
        </Grid>
      </Grid>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Compatibility</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Protein (g)</TableCell>
              <TableCell>Carbs (g)</TableCell>
              <TableCell>Fat (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFoods.map((food) => (
              <TableRow key={food.id}>
                <TableCell>
                  <Typography variant="body1">{food.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {food.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={food.category} size="small" />
                </TableCell>
                <TableCell>
                  {user && (
                    <CompatibilityBadge 
                      compatibility={food.bloodTypeCompatibility[user.bloodType]} 
                    />
                  )}
                </TableCell>
                <TableCell>{food.nutritionalInfo.calories}</TableCell>
                <TableCell>{food.nutritionalInfo.protein}</TableCell>
                <TableCell>{food.nutritionalInfo.carbs}</TableCell>
                <TableCell>{food.nutritionalInfo.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FoodDatabasePage; 