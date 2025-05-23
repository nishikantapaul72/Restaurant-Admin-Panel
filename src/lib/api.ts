import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

interface PaginationParams {
  _page?: number;
  _limit?: number;
  name_like?: string;
  category?: string;
  status?: string;
}

export const menuApi = {
  getItems: async (params: PaginationParams = { _page: 1, _limit: 10 }) => {
    const finalParams = {
      _page: params._page || 1,
      _limit: params._limit || 10,
      ...(params.name_like && { name_like: params.name_like }),
      ...(params.category && { category: params.category })
    };

    const response = await api.get('/menuItems', { params: finalParams });
    
    return {
      items: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0'),
      currentPage: finalParams._page,
      limit: finalParams._limit
    };
  },

  createItem: async (data: any) => {
    const response = await api.post('/menuItems', data);
    return response.data;
  },

  updateItem: async (id: number, data: any) => {
    const response = await api.put(`/menuItems/${id}`, data);
    return response.data;
  },

  deleteItem: async (id: number) => {
    const response = await api.delete(`/menuItems/${id}`);
    return response.data;
  },
};

export const categoriesApi = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

export const ordersApi = {
  getOrders: async (params: PaginationParams = { _page: 1, _limit: 10 }) => {
    const finalParams = {
      _page: params._page || 1,
      _limit: params._limit || 10,
      'customer.name_like': params.name_like,
      ...(params.status && { status: params.status })
    };

    const response = await api.get('/orders', { params: finalParams });
    
    return {
      orders: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0'),
      currentPage: finalParams._page,
      limit: finalParams._limit
    };
  },
  updateOrderStatus: async (id: number, status: string) => {
    const response = await api.put(`/orders/${id}`, { status });
    return response.data;
  },
};