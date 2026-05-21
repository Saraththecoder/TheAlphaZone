import axios from 'axios';
import { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?category=${category}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      return [];
    }
  },

  search: async (query: string): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search products:', error);
      return [];
    }
  },
};

export const orderAPI = {
  create: async (orderData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      return null;
    }
  },
};

export const paymentAPI = {
  processPayment: async (paymentData: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error('Failed to process payment:', error);
      throw error;
    }
  },
};
