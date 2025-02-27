import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BloodType } from '../../types';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bloodType: BloodType.APositive
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
    navigate('/meal-planner');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Blood Type</InputLabel>
        <Select
          value={formData.bloodType}
          onChange={(e) => setFormData({ ...formData, bloodType: e.target.value as BloodType })}
        >
          {Object.values(BloodType).map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
}; 