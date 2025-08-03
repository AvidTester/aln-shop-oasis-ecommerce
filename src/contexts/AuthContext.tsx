
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthContext: Checking authentication...');
      const token = localStorage.getItem('token');
      console.log('AuthContext: Token found:', !!token);
      
      if (token) {
        try {
          console.log('AuthContext: Verifying token with backend...');
          const response = await authService.getProfile();
          console.log('AuthContext: Profile response:', response);
          setState({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('AuthContext: Token verification failed:', error);
          localStorage.removeItem('token');
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        console.log('AuthContext: No token found');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('AuthContext: Login attempt for:', email);
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log('AuthContext: Calling backend login API...');
      const response = await authService.login({ email, password });
      console.log('AuthContext: Login response:', response);
      
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log('AuthContext: Login successful, user:', response.user);
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.register({ name, email, password });
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
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
