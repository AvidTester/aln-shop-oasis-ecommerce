
import { apiRequest, getAuthHeaders } from './api';

export const adminService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return apiRequest('/admin/stats', {
      headers: getAuthHeaders(),
    });
  },

  // Get all orders
  getOrders: async () => {
    return apiRequest('/admin/orders', {
      headers: getAuthHeaders(),
    });
  },

  // Get all users
  getUsers: async () => {
    return apiRequest('/admin/users', {
      headers: getAuthHeaders(),
    });
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string) => {
    return apiRequest(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
  },
};
