
import { apiRequest, getAuthHeaders } from './api';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  createdAt: string;
}

export const brandService = {
  // Get all brands
  getBrands: async () => {
    return apiRequest('/brands');
  },

  // Get single brand
  getBrand: async (id: string) => {
    return apiRequest(`/brands/${id}`);
  },

  // Admin: Create brand
  createBrand: async (brandData: Partial<Brand>) => {
    return apiRequest('/brands', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
  },

  // Admin: Update brand
  updateBrand: async (id: string, brandData: Partial<Brand>) => {
    return apiRequest(`/brands/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
  },

  // Admin: Delete brand
  deleteBrand: async (id: string) => {
    return apiRequest(`/brands/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
