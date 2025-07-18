
import { apiRequest } from './api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes?: string[];
  colors?: { name: string; value: string }[];
  features?: string[];
  stock: number;
  rating: number;
  numReviews: number;
  badge?: string;
  category: {
    name: string;
    slug: string;
  };
  brand: {
    name: string;
    slug: string;
  };
}

export const productService = {
  // Get all products with filters
  getProducts: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    
    return apiRequest(`/products?${queryParams.toString()}`);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return apiRequest('/products/featured/list');
  },

  // Get single product
  getProduct: async (id: string) => {
    return apiRequest(`/products/${id}`);
  },

  // Admin: Create product
  createProduct: async (productData: Partial<Product>) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Admin: Update product
  updateProduct: async (id: string, productData: Partial<Product>) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Admin: Delete product
  deleteProduct: async (id: string) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
