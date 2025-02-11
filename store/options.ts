import { defineStore } from 'pinia';

export const useOptionsStore = defineStore('options', {

state: () => ({
  genderOptions: [],
  hairstyleOptions: [],
  haircolorOptions: [],
  raceOptions: [],
  topclothingOptions: [],
  topcolorOptions: [],
  patternOptions: [],
  bottomclothingOptions: [],
  bottomcolorOptions: [],
  locationOptions: [],
  cameraviewOptions: [],
}),
actions: {
  async fetchOptions() {
    try {
      const response = await fetch('/api/options');
      const data = await response.json();

      // update the options in the store
      this.genderOptions = data.genderOptions;
      this.hairstyleOptions = data.hairstyleOptions;
      this.haircolorOptions = data.haircolorOptions;
      this.raceOptions = data.raceOptions;
      this.topclothingOptions = data.topclothingOptions;
      this.topcolorOptions = data.topcolorOptions;
      this.patternOptions = data.patternOptions;
      this.bottomclothingOptions = data.bottomclothingOptions;
      this.bottomcolorOptions = data.bottomcolorOptions;
      this.locationOptions = data.locationOptions;
      this.cameraviewOptions = data.cameraviewOptions;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  },
},
});



