
import { apiRequest, getAuthHeaders } from './api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    return apiRequest('/categories');
  },

  // Get single category
  getCategory: async (id: string) => {
    return apiRequest(`/categories/${id}`);
  },

  // Admin: Create category
  createCategory: async (categoryData: Partial<Category>) => {
    return apiRequest('/categories', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
  },

  // Admin: Update category
  updateCategory: async (id: string, categoryData: Partial<Category>) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
  },

  // Admin: Delete category
  deleteCategory: async (id: string) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
