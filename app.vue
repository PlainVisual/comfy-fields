<template>
  <div class="container-lg flex flex-col gap-8 lg:flex-row p-4 font-display h-full">
    <div class="comfy-fields basis-full lg:basis-2/6 flex flex-col justify-center">
      <h1 class="text-3xl font-black mb-2 ">Comfy fields</h1>
    <form class="flex flex-col gap-6" @submit.prevent="submitPrompt">
      <select-field 
        label=""
        :options="genderOptions"
        v-model="formData.gender"
        @weightChange="updateWeight"
        :id="'gender'"
      />
      <select-field 
        label=""
        :options="hairstyleOptions"
        v-model="formData.hairStyle"
        @weightChange="updateWeight"
        :id="'hairStyle'"      
      />
      <select-field 
        label=""
        :options="haircolorOptions"
        v-model="formData.hairColor"
        @weightChange="updateWeight"
        :id="'hairColor'"      
      />
      <select-field 
        label=""
        :options="raceOptions"
        v-model="formData.race"
        @weightChange="updateWeight"
        :id="'race'"          
      />
      <select-field 
        label=""
        :options="topclothingOptions"
        v-model="formData.topClothing"
        @weightChange="updateWeight"
        :id="'topClothing'"                       
      />
      <select-field 
        label=""
        :options="topcolorOptions"
        v-model="formData.topColor"
        @weightChange="updateWeight"      
        :id="'topColor'"      
      />
      <select-field 
        label=""
        :options="patternOptions"
        v-model="formData.topPattern"
        @weightChange="updateWeight"
        :id="'topPattern'"      
      />
      <select-field 
        label=""
        :options="bottomclothingOptions"
        v-model="formData.bottomClothing"
        @weightChange="updateWeight"
        :id="'bottomClothing'"      
      />
      <select-field 
        label=""
        :options="bottomcolorOptions"
        v-model="formData.bottomColor"
        @weightChange="updateWeight"
        :id="'bottomColor'"      
      />
      <select-field 
        label=""
        :options="locationOptions"
        v-model="selectedLocation"
        @weightChange="updateWeight"
        :id="'location'"
        @change="updateLocationDescription"
      />
      <select-field 
        label=""
        :options="cameraviewOptions"
        v-model="formData.cameraView"
        @weightChange="updateWeight"
        :id="'cameraView'"      
      />
    
      <button class="btn btn-primary" type="submit">Generate Image</button>

    </form>
    </div>
    <div class="image-result p-6 relative min-h-[300px] md:min-h-[500px] basis-full lg:basis-4/6 bg-background-brand-primary rounded-lg">
      <div v-if="isLoading" class="progress-container absolute bottom-0 left-0">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <div v-if="imageUrls.length">
        <h2>Generated Images</h2>
        <div v-for="(url, index) in imageUrls" :key="index">
          <div class="img-placeholder h-[500px] w-fit rounded-2xl overflow-hidden">
            <img class="image h-full" :src="url" alt="Generated Image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useOptionsStore } from '@/store/options';

export default {
  
  data() {
    return {
formData: {
        gender: '',
        hairColor: '',
        hairStyle: '',
        topClothing: 't-shirt',
        bottomClothing: 'jeans',
        topColor: 'white',
        topPattern: '',
        bottomColor: 'white',
        race: '',
        location: '',
        locationDescription: '',
        cameraView: '',
        weights: {
          gender: { value: 0, adjustment: 'more' },
          hairStyle: { value: 0, adjustment: 'more' },
          hairColor: { value: 0, adjustment: 'more' },
          race: { value: 0, adjustment: 'more' },
          topClothing: { value: 0, adjustment: 'more' },
          bottomClothing: { value: 0, adjustment: 'more' },
          topColor: { value: 0, adjustment: 'more' },
          topPattern: { value: 0, adjustment: 'more' },
          bottomColor: { value: 0, adjustment: 'more' },
          location: { value: 0, adjustment: 'more' },
          cameraView: { value: 0, adjustment: 'more' }
  }
      },
      selectedLocation: '', // Tracks the location dropdown selection
      locationDescriptions: {
        'Tokyo, Japan': 'futuristic skyline with neon lights',
        'Paris, France': 'Eiffel Tower in the background',
        'New York City, USA': 'Times Square or Manhattan skyline',
        'Dubai, UAE': 'Burj Khalifa or modern skyscrapers',
        'Rio de Janeiro, Brazil': 'Christ the Redeemer statue and beaches',
        'Sydney, Australia': 'Sydney Opera House and Harbour Bridge',
        'Cairo, Egypt': 'Great Pyramids of Giza and desert backdrop',
        'London, UK': 'Big Ben and Tower Bridge',
        'Amsterdam, Netherlands': 'backdrop with tulip fields',
      },
      imageUrls: [],
      progress: 0,
      isLoading: false,
      optionsStore: useOptionsStore(),
    };
  },
  async mounted() {
    if (!Object.keys(this.optionsStore.options).length) {
    await this.optionsStore.fetchOptions();
  }
  },
  computed: {
    genderOptions() {
      return this.optionsStore.options.genderOptions || [];
    },
    hairstyleOptions() {
      return this.optionsStore.options.hairstyleOptions || [];
    },
    haircolorOptions() {
      return this.optionsStore.options.haircolorOptions || [];
    },
    raceOptions() {
      return this.optionsStore.options.raceOptions || [];
    },
    topclothingOptions() {
      return this.optionsStore.options.topclothingOptions || [];
    },
    topcolorOptions() {
      return this.optionsStore.options.topcolorOptions || [];
    },
    patternOptions() {
      return this.optionsStore.options.patternOptions || [];
    },
    bottomclothingOptions() {
      return this.optionsStore.options.bottomclothingOptions || [];
    },
    bottomcolorOptions() {
      return this.optionsStore.options.bottomcolorOptions || [];
    },
    locationOptions() {
      return this.optionsStore.options.locationOptions || [];
    },
    cameraviewOptions() {
      return this.optionsStore.options.cameraviewOptions || [];
    },
  },
  methods: {
    updateLocationDescription() {
      // Update location and its description in formData
      this.formData.location = this.selectedLocation;
      this.formData.locationDescription = this.locationDescriptions[this.selectedLocation] || '';
    },

    updateWeight({ field, weight, adjustment }) {
  if (!field) {
    console.error("Invalid field in weightChange event:", field);
    return;
  }

  this.formData.weights[field] = { value: weight, adjustment };
  console.log('Updated weights:', this.formData.weights[field]);
},

    async submitPrompt() {
      this.isLoading = true;
      this.progress = 0;

      let progressInterval = null;

      try {

        console.log('FormData before submitting:', this.formData);
         // Start a timer to simulate progress updates
         const progressInterval = setInterval(() => {
          if (this.progress < 90) {
            this.progress += 5; // Increment progress
          }
        }, 500);

        const response = await fetch('/api/modify-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.formData),
    });

        const data = await response.json();
        clearInterval(progressInterval); // Stop the interval
        this.progress = 100; // Set progress to 100


        if (data.images) {
      this.imageUrls = data.images;
    } else {
      console.error('No images found in response:', data);
    }
      } catch (error) {
        console.error('Error generating images:', error);
      }  finally {
        if (progressInterval) {
      clearInterval(progressInterval); // Ensure it's cleared in the finally block too
    }
        this.progress = 100; // Set to complete
        setTimeout(() => {
          this.isLoading = false;
          this.progress = 0; // Reset progress
        }, 500); // Briefly show full progress before reset
      }
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
form {
  margin-bottom: 20px;
}

input {
  margin: 5px;
}

button {
  margin-top: 10px;
}

/* Progress Bar Styles */
.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
  height: 20px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.2s ease-in-out;
}
</style>
