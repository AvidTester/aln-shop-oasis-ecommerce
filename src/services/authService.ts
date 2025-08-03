
import { apiRequest } from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  // User login - Mock implementation until backend is available
  login: async (loginData: LoginData) => {
    console.log('AuthService: Mock login for:', loginData.email);
    
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo credentials
    if (loginData.email === 'admin@demo.com' && loginData.password === 'admin123') {
      const mockResponse = {
        user: {
          _id: 'admin_1',
          name: 'Admin User',
          email: loginData.email,
          role: 'admin' as const
        },
        token: 'mock_admin_token_' + Date.now()
      };
      console.log('AuthService: Mock admin login successful:', mockResponse);
      return mockResponse;
    }
    
    if (loginData.email === 'user@demo.com' && loginData.password === 'password123') {
      const mockResponse = {
        user: {
          _id: 'user_1',
          name: 'Demo User',
          email: loginData.email,
          role: 'user' as const
        },
        token: 'mock_user_token_' + Date.now()
      };
      console.log('AuthService: Mock user login successful:', mockResponse);
      return mockResponse;
    }
    
    console.log('AuthService: Invalid credentials');
    throw new Error('Invalid credentials');
  },

  // User register - Mock implementation
  register: async (registerData: RegisterData) => {
    console.log('AuthService: Mock register for:', registerData.email);
    
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResponse = {
      user: {
        _id: 'user_' + Date.now(),
        name: registerData.name,
        email: registerData.email,
        role: 'user' as const
      },
      token: 'mock_token_' + Date.now()
    };
    console.log('AuthService: Mock register successful:', mockResponse);
    return mockResponse;
  },

  // Get current user profile - Mock implementation
  getProfile: async () => {
    console.log('AuthService: Mock getProfile');
    const token = localStorage.getItem('token');
    
    if (!token || !token.startsWith('mock_')) {
      console.log('AuthService: Invalid or missing token');
      throw new Error('Invalid token');
    }
    
    // Mock user data based on token
    if (token.includes('admin')) {
      const mockResponse = {
        user: {
          _id: 'admin_1',
          name: 'Admin User',
          email: 'admin@demo.com',
          role: 'admin' as const
        }
      };
      console.log('AuthService: Mock admin profile:', mockResponse);
      return mockResponse;
    } else {
      const mockResponse = {
        user: {
          _id: 'user_1',
          name: 'Demo User',
          email: 'user@demo.com',
          role: 'user' as const
        }
      };
      console.log('AuthService: Mock user profile:', mockResponse);
      return mockResponse;
    }
  },
};
