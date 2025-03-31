import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const usePlanetsStore = defineStore('planets', {
  state: () => ({
    planets: [],
    planet: null,
    loading: false,
    error: null,
  }),
  
  getters: {
    getPlanets: (state) => state.planets,
    getPlanet: (state) => state.planet,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  
  actions: {
    async fetchPlanets() {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/planets`);
        this.planets = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch planets';
        console.error('Error fetching planets:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchPlanetById(id) {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/planets/${id}`);
        this.planet = response.data;
        this.error = null;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch planet details';
        console.error('Error fetching planet:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async createPlanet(planetData) {
      this.loading = true;
      try {
        const response = await axios.post(`${API_URL}/planets`, planetData);
        // Add the new planet to the planets array
        this.planets.push(response.data);
        this.error = null;
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create planet';
        console.error('Error creating planet:', error);
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    resetPlanet() {
      this.planet = null;
    }
  }
}); 