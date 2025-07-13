
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
  // User login
  login: async (loginData: LoginData) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  // User register
  register: async (registerData: RegisterData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });
  },

  // Admin login
  adminLogin: async (loginData: LoginData) => {
    return apiRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  // Get current user profile
  getProfile: async () => {
    const token = localStorage.getItem('token');
    return apiRequest('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
