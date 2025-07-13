
import { apiRequest } from './api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
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
      body: JSON.stringify(categoryData),
    });
  },

  // Admin: Update category
  updateCategory: async (id: string, categoryData: Partial<Category>) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // Admin: Delete category
  deleteCategory: async (id: string) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};
