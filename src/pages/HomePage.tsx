import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: 'Meal Planning',
      description: 'Plan your meals based on your blood type diet',
      image: 'https://source.unsplash.com/random/400x200/?healthy-food',
      path: '/meal-planner'
    },
    {
      title: 'Food Database',
      description: 'Comprehensive database of foods compatible with your blood type',
      image: 'https://source.unsplash.com/random/400x200/?vegetables',
      path: '/food-database'
    },
    {
      title: 'Herb Dictionary',
      description: 'Learn about healing herbs suitable for your blood type',
      image: 'https://source.unsplash.com/random/400x200/?herbs',
      path: '/herbs'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your diet compliance and health metrics',
      image: 'https://source.unsplash.com/random/400x200/?health',
      path: '/tracking'
    }
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          Blood Type Diet Tracker
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Optimize your diet based on your blood type
        </Typography>
        {!user && (
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(feature.path)}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 