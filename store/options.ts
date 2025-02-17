import { defineStore } from 'pinia';

export const useOptionsStore = defineStore('options', {
  state: () => ({
    options: {}, // Store all options dynamically
  }),
  actions: {
    async fetchOptions() {
      try {
        const response = await fetch('/api/options');
        const data = await response.json();

        // Update the store dynamically
        this.options = data;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
  },
});



