import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MealPlannerPage from './pages/MealPlannerPage';
import FoodDatabasePage from './pages/FoodDatabasePage';
import HerbDictionaryPage from './pages/HerbDictionaryPage';
import TrackingPage from './pages/TrackingPage';
import CommunityPage from './pages/CommunityPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/meal-planner" element={<MealPlannerPage />} />
      <Route path="/food-database" element={<FoodDatabasePage />} />
      <Route path="/herbs" element={<HerbDictionaryPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/" element={<Navigate to="/meal-planner" replace />} />
    </Routes>
  );
}; 