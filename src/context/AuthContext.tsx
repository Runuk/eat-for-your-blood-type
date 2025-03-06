import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, BloodType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, bloodType: BloodType) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock successful login
      const mockUser: User = {
        id: '1',
        username: 'John Doe',
        email: email,
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
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setError(null);
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, bloodType: BloodType) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock registration - in real app, this would call an API
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: name,
        email,
        bloodType,
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

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 