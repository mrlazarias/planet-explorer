import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${API_URL}/users/login`, {
          username,
          password,
        });
        
        const { _id, username: user, token } = response.data;
        
        this.user = { _id, username: user };
        this.token = token;
        
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', token);
        
        // Set auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        };
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];
    },
    
    // Initialize auth state on app load
    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  }
});
