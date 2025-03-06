import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper,
  Grid,
  Avatar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { BloodType, User } from '../types';

type UserUpdateData = Pick<User, 'userName' | 'bloodType'>;

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState<UserUpdateData>({
    userName: user?.userName || '',
    bloodType: user?.bloodType || BloodType.APositive
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const updatedData: Partial<User> = {
          userName: formData.userName,
          bloodType: formData.bloodType
        };
        await updateUser(updatedData);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please log in to view your profile.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64 }}>
            {user.userName.charAt(0)}
          </Avatar>
          <Typography variant="h4">Profile</Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.userName}
                onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Blood Type</InputLabel>
                <Select
                  value={formData.bloodType}
                  label="Blood Type"
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value as BloodType }))}
                >
                  {Object.values(BloodType).map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage; 