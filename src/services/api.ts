
import axios from 'axios';
import { toast } from 'sonner';

// const API_URL = 'https://dsa-tracker-adv.onrender.com/api';

// Create an Axios instance
const api = axios.create({
  baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.username && user.password) {
        const encodedCredentials = btoa(`${user.username}:${user.password}`);
        config.headers.Authorization = `Basic ${encodedCredentials}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If using the dummy mode, don't show error toasts for auth endpoints
    const isDummyMode = true; // Always use dummy mode for now
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    
    if (isDummyMode && isAuthEndpoint) {
      return Promise.reject(error);
    }
    
    const message = error.response?.data?.message || 'An unexpected error occurred';
    if (error.response?.status === 401) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

// Auth API with dummy mode
export const authAPI = {
  signup: async (userData: any) => {
    try {
      // Try real API first
      return await api.post('/auth/signup', userData);
    } catch (error) {
      console.log('Using dummy signup mode');
      // Simulate successful signup in dummy mode
      return { 
        data: {
          id: 1,
          username: userData.username,
          email: userData.email,
          streakCount: 0
        }
      };
    }
  },
  
  login: async (credentials: any) => {
    try {
      // Try real API first
      const response = await api.post('/auth/login', credentials);
      // Store user data (including password for Basic Auth)
      localStorage.setItem('user', JSON.stringify({
        ...(typeof response.data === 'object' && response.data !== null ? response.data : {}),
        password: credentials.password // Store the password for Basic Auth
      }));
      return response;
    } catch (error) {
      console.log('Using dummy login mode');
      // Simulate successful login in dummy mode
      const dummyUser = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        streakCount: Math.floor(Math.random() * 10),
        password: credentials.password,
        lastActiveDate: new Date().toISOString().split('T')[0]
      };
      
      // Store the dummy user data
      localStorage.setItem('user', JSON.stringify(dummyUser));
      
      // Return a fake successful response
      return { 
        data: dummyUser
      };
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};

// Problems API
export interface McqRequest {
  topic: string;
}

export interface McqResponse {
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
}

// Problems API
export const problemsAPI = {
  getAll: (userId: number) => api.get(`/problems/${userId}`),
  get: (id: number) => api.get(`/problems/${id}`),
  create: (data: any) => api.post('/problems', data),
  update: (id: number, data: any) => api.put(`/problems/${id}`, data),
  delete: (id: number) => api.delete(`/problems/${id}`),
  getSimilar: (id: number) => api.get(`/problems/${id}/similar`),

  generateMcqs: (topic: string) => api.post<McqResponse[]>('/mcqs/generate', { topic } as McqRequest),

};

// Streaks API
export const streaksAPI = {
  getUserStreaks: (userId: number) => api.get(`/streaks/${userId}`),
  updateStreak: (userId: number) => api.post(`/streaks/update/${userId}`)
};

export default api;
