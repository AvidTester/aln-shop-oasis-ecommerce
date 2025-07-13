
import { apiRequest } from './api';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
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
      body: JSON.stringify(brandData),
    });
  },

  // Admin: Update brand
  updateBrand: async (id: string, brandData: Partial<Brand>) => {
    return apiRequest(`/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify(brandData),
    });
  },

  // Admin: Delete brand
  deleteBrand: async (id: string) => {
    return apiRequest(`/brands/${id}`, {
      method: 'DELETE',
    });
  },
};
