import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Paper } from '@mui/material';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Profile</Typography>
        <Typography>Username: {user.username}</Typography>
        <Typography>Blood Type: {user.bloodType}</Typography>
      </Paper>
    </Box>
  );
};

export default UserProfilePage; 