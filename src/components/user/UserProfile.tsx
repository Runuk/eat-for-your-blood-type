import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { User } from '../../types';

interface UserProfileProps {
  user?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No user data available</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
          {user.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2">
            Blood Type: {user.bloodType}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserProfile; 