import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Avatar, Rating } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { MealPlan } from '../types';
import { CommunityService } from '../services/community';

export const CommunityPage = () => {
  const { user } = useAuth();
  const [sharedPlans, setSharedPlans] = useState<MealPlan[]>(CommunityService.getSharedPlans());
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (planId: string) => {
    if (!user || !newComment.trim()) return;

    const plan = sharedPlans.find(p => p.id === planId);
    if (plan) {
      const updatedPlan = CommunityService.addComment(plan, user, newComment);
      setSharedPlans(plans => plans.map(p => p.id === planId ? updatedPlan : p));
      setNewComment('');
    }
  };

  const handleRatePlan = (planId: string, rating: number) => {
    if (!user) return;

    const plan = sharedPlans.find(p => p.id === planId);
    if (plan) {
      const updatedPlan = CommunityService.ratePlan(plan, user.id, rating);
      setSharedPlans(plans => plans.map(p => p.id === planId ? updatedPlan : p));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Community</Typography>
      <Grid container spacing={3}>
        {sharedPlans.map((plan) => (
          <Grid item xs={12} key={plan.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{plan.userId.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="h6">{plan.title}</Typography>
                    <Rating
                      value={plan.ratings.reduce((acc, curr) => acc + curr.score, 0) / plan.ratings.length || 0}
                      onChange={(_, value) => value && handleRatePlan(plan.id, value)}
                      precision={0.5}
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add a comment"
                    multiline
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleAddComment(plan.id)}
                    disabled={!newComment.trim()}
                    sx={{ mt: 1 }}
                  >
                    Comment
                  </Button>
                </Box>

                <Box>
                  {plan.comments.map((comment) => (
                    <Box key={comment.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                          {comment.userId.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {new Date(comment.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{comment.content}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 