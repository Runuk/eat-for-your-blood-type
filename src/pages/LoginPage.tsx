import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Link, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BloodType } from '../types';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodType, setBloodType] = useState<BloodType>('A');
  const { login, register, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await login(email, password);
      navigate('/meal-planner');
    } else {
      await register(name, email, password, bloodType);
      navigate('/meal-planner');
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? 'Login' : 'Create Account'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {!isLogin && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="blood-type-label">Blood Type</InputLabel>
                <Select
                  labelId="blood-type-label"
                  value={bloodType}
                  label="Blood Type"
                  onChange={(e) => setBloodType(e.target.value as BloodType)}
                  required
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
              </FormControl>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage; 