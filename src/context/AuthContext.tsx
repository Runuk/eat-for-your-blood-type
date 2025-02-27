import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BloodType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { username: string; password: string; bloodType: BloodType }) => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const login = async (username: string, password: string) => {
    // Mock login - in a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      username,
      bloodType: BloodType.APositive,
      isAdmin: false,
      preferences: {
        dietaryRestrictions: [],
        notifications: {
          mealPrep: true,
          shoppingList: true,
          mealLogging: true,
          weeklyProgress: true
        }
      },
      metrics: {
        complianceRate: 0,
        weightHistory: []
      }
    };
    
    updateUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData: { username: string; password: string; bloodType: BloodType }) => {
    const newUser: User = {
      id: Math.random().toString(),
      username: userData.username,
      bloodType: userData.bloodType,
      isAdmin: false,
      preferences: {
        dietaryRestrictions: [],
        notifications: {
          mealPrep: true,
          shoppingList: true,
          mealLogging: true,
          weeklyProgress: true
        }
      },
      metrics: {
        complianceRate: 0,
        weightHistory: []
      }
    };
    
    updateUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 