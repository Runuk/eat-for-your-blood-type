import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import { 
  getSharedMealPlans, 
  addComment, 
  rateMealPlan, 
  SharedMealPlan 
} from '../services/community';
import { useAuth } from '../context/AuthContext';
import { Comment } from '../types';

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const [sharedPlans, setSharedPlans] = useState<SharedMealPlan[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadSharedPlans = async () => {
      const plans = await getSharedMealPlans();
      setSharedPlans(plans);
      
      // Initialize comments and ratings
      const initialComments: { [key: string]: string } = {};
      const initialRatings: { [key: string]: number } = {};
      
      plans.forEach(plan => {
        initialComments[plan.id] = '';
        initialRatings[plan.id] = 0;
      });
      
      setComments(initialComments);
      setRatings(initialRatings);
    };
    
    loadSharedPlans();
  }, []);

  const handleAddComment = async (planId: string) => {
    if (!user || !comments[planId]?.trim()) return;
    
    const newComment = await addComment(
      planId,
      user.id,
      comments[planId],
      user.userName
    );
    
    // Update the shared plans with the new comment
    setSharedPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? {
              ...plan,
              comments: [
                ...plan.comments,
                newComment
              ]
            }
          : plan
      )
    );
    
    setComments(prev => ({ ...prev, [planId]: '' }));
  };

  const handleRateMealPlan = async (planId: string, rating: number) => {
    if (!user) return;
    
    await rateMealPlan(planId, user.id, rating);
    
    // Update the shared plans with the new rating
    setSharedPlans(prevPlans => 
      prevPlans.map(plan => {
        if (plan.id === planId) {
          const newRatings = [...plan.ratings, { userId: user.id, rating }];
          const avgRating = newRatings.reduce((sum, r) => sum + r.rating, 0) / newRatings.length;
          
          return {
            ...plan,
            ratings: newRatings,
            averageRating: avgRating
          };
        }
        return plan;
      })
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Community</Typography>
      
      <Grid container spacing={3}>
        {sharedPlans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{plan.title}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={plan.averageRating} 
                      precision={0.5} 
                      readOnly 
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({plan.averageRating.toFixed(1)})
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Shared by {plan.userName} on {new Date(plan.dateShared).toLocaleDateString()}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {plan.description}
                </Typography>
                
                <Button variant="outlined" size="small">
                  View Full Plan
                </Button>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Rate this meal plan:
                </Typography>
                
                <Rating
                  value={ratings[plan.id]}
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      setRatings(prev => ({ ...prev, [plan.id]: newValue }));
                      handleRateMealPlan(plan.id, newValue);
                    }
                  }}
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Comments ({plan.comments.length})
                </Typography>
                
                <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {plan.comments.map((comment: Comment) => (
                    <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {comment.userName?.charAt(0) || '?'}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">
                              {comment.userName || 'Anonymous'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(comment.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        secondary={comment.content}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              
              <CardActions sx={{ px: 2, pb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  value={comments[plan.id]}
                  onChange={(e) => setComments(prev => ({ ...prev, [plan.id]: e.target.value }))}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => handleAddComment(plan.id)}
                  disabled={!comments[plan.id].trim()}
                >
                  Post
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityPage; 