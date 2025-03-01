import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MealPlannerPage from './pages/MealPlannerPage';
import FoodDatabasePage from './pages/FoodDatabasePage';
import HerbDictionaryPage from './pages/HerbDictionaryPage';
import TrackingPage from './pages/TrackingPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/meal-planner" element={<ProtectedRoute element={<MealPlannerPage />} />} />
      <Route path="/food-database" element={<ProtectedRoute element={<FoodDatabasePage />} />} />
      <Route path="/herbs" element={<ProtectedRoute element={<HerbDictionaryPage />} />} />
      <Route path="/tracking" element={<ProtectedRoute element={<TrackingPage />} />} />
      <Route path="/community" element={<ProtectedRoute element={<CommunityPage />} />} />
      <Route path="/" element={<Navigate to="/meal-planner" replace />} />
    </Routes>
  );
}; 