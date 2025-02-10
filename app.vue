<template>
  <div class="container-lg flex flex-col gap-8 lg:flex-row p-4 font-display h-full">
    <div class="comfy-fields basis-full lg:basis-2/6 flex flex-col justify-center">
      <h1 class="text-3xl font-black mb-2">Comfy fields</h1>
    <form class="flex flex-col gap-6" @submit.prevent="submitPrompt">
      <select-field 
        label=""
        :options="genderOptions"
        v-model="formData.gender"
        id="gender"      
      />
      <select-field 
        label=""
        :options="hairstyleOptions"
        v-model="formData.hairStyle"
        id="hairstyle"      
      />
      <select-field 
        label=""
        :options="haircolorOptions"
        v-model="formData.hairColor"
        id="haircolor"      
      />
      <select-field 
        label=""
        :options="raceOptions"
        v-model="formData.race"
        id="race"      
      />
      <select-field 
        label=""
        :options="topclothingOptions"
        v-model="formData.topClothing"
        id="topClothing"      
      />
      <select-field 
        label=""
        :options="topcolorOptions"
        v-model="formData.topColor"
        id="topColor"      
      />
      <select-field 
        label=""
        :options="patternOptions"
        v-model="formData.topPattern"
        id="topPattern"      
      />
      <select-field 
        label=""
        :options="bottomclothingOptions"
        v-model="formData.bottomClothing"
        id="bottomClothing"      
      />
      <select-field 
        label=""
        :options="bottomcolorOptions"
        v-model="formData.bottomColor"
        id="bottomColor"      
      />
      <select-field 
        label=""
        :options="locationOptions"
        v-model="selectedLocation"
        id="location"
        @change="updateLocationDescription"
      />
      <select-field 
        label=""
        :options="cameraviewOptions"
        v-model="formData.cameraView"
        id="cameraView"      
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

export default {
  
  data() {
    return {

genderOptions: [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "non-binary" },
  { label: "Other", value: "other" },
],

hairstyleOptions: [
  { label: "Select Hairstyle", value: "" },
  { label: "Short Hair", value: "short" },
  { label: "Long Hair", value: "long" },
  { label: "Curly Hair", value: "curly" },
  { label: "Straight Hair", value: "straight" },
  { label: "Wavy Hair", value: "wavy" },
  { label: "Buzz Cut", value: "buzz_cut" },
  { label: "Bob Cut", value: "bob_cut" },
  { label: "Ponytail", value: "ponytail" },
  { label: "Braided Hair", value: "braided" },
  { label: "Undercut", value: "undercut" },
],

haircolorOptions: [
  { label: "Select Hair Color", value: "" },
  { label: "Blonde", value: "blonde" },
  { label: "Brown", value: "brown" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gray", value: "gray" },
  { label: "Other", value: "other" },
],

raceOptions: [
  { label: "Select Race", value: "" },
  { label: "Asian", value: "asian" },
  { label: "Caucasian", value: "caucasian" },
  { label: "African", value: "african" },
  { label: "Latino", value: "latino" },
  { label: "Hispanic", value: "hispanic" },
  { label: "Afro-American", value: "afro-american" },
  { label: "Indigenous", value: "indigenous" },
  { label: "Mixed", value: "mixed" },
  { label: "Native American", value: "native american" },
  { label: "Pacific Islander", value: "pacific islander" },
  { label: "Middle Eastern", value: "middle eastern" },
  { label: "Other", value: "other" },
],

topclothingOptions: [
  { label: "Select Top Clothing", value: "" },
  { label: "T-Shirt", value: "t-shirt" },
  { label: "Shirt", value: "shirt" },
  { label: "Sweater", value: "sweater" },
  { label: "Jacket", value: "jacket" },
  { label: "Blouse", value: "blouse" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Tank Top", value: "tank_top" },
  { label: "Cardigan", value: "cardigan" },
  { label: "Blazer", value: "blazer" },
  { label: "Dress", value: "dress" },
  { label: "Crop Top", value: "crop_top" },
  { label: "Blouse", value: "blouse" },
  { label: "Other", value: "other" },
],

topcolorOptions: [
  { label: "Select Top Color", value: "" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
  { label: "Orange", value: "orange" },
  { label: "Pink", value: "pink" },
  { label: "Brown", value: "brown" },
  { label: "Gray", value: "gray" },
  { label: "Other", value: "other" },
],

patternOptions: [
  { label: "Select Pattern", value: "" },
  { label: "Striped", value: "striped" },
  { label: "Polka Dots", value: "polka_dots" },
  { label: "Plaid", value: "plaid" },
  { label: "Floral", value: "floral" },
  { label: "Geometric", value: "geometric" },
  { label: "Animal Print", value: "animal_print" },
  { label: "Abstract", value: "abstract" },
  { label: "Solid", value: "solid" },
],

bottomclothingOptions: [
  { label: "Select Bottom Clothing", value: "" },
  { label: "Jeans", value: "jeans" },
  { label: "Shorts", value: "shorts" },
  { label: "Skirt", value: "skirt" },
  { label: "Trousers", value: "trousers" },
  { label: "Leggings", value: "leggings" },
  { label: "Capris", value: "capris" },
  { label: "Cargo Pants", value: "cargo_pants" },
  { label: "Sweatpants", value: "sweatpants" },
  { label: "Chinos", value: "chinos" },
  { label: "Other", value: "other" },
],

bottomcolorOptions: [
  { label: "Select Bottom Color", value: "" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Yellow", value: "yellow" },
  { label: "Other", value: "other" },
],

locationOptions: [
  { label: "Select Location", value: "" },
  { label: "Amsterdam, Netherlands", value: "Amsterdam, Netherlands" },
  { label: "Tokyo, Japan", value: "Tokyo, Japan" },
  { label: "Paris, France", value: "Paris, France" },
  { label: "New York City, USA", value: "New York City, USA" },
  { label: "Dubai, UAE", value: "Dubai, UAE" },
  { label: "Rio de Janeiro, Brazil", value: "Rio de Janeiro, Brazil" },
  { label: "Sydney, Australia", value: "Sydney, Australia" },
  { label: "Cairo, Egypt", value: "Cairo, Egypt" },
  { label: "London, UK", value: "London, UK" },
],

cameraviewOptions: [
  { label: "Select Camera View", value: "" },
  { label: "Close-up", value: "close-up" },
  { label: "Wide angle", value: "wide angle" },
  { label: "Eye-level headshot", value: "eye-level headshot" },
  { label: "Over the shoulder", value: "over the shoulder" },
  { label: "Low angle", value: "low angle" },
  { label: "High angle", value: "high angle" },
  { label: "Side view", value: "side view" },
  { label: "Front view", value: "front view" },
  { label: "Three-quarter view", value: "three-quarter view" },
  { label: "Bird's eye view", value: "birds eye view" },
  { label: "Worm's eye view", value: "worms eye view" },
  { label: "Dutch angle", value: "dutch angle" },
  { label: "Overhead shot", value: "overhead shot" }
],  



formData: {
        gender: '',
        hairColor: '',
        hairStyle: '',
        topClothing: '',
        bottomClothing: '',
        topColor: '',
        topPattern: '',
        bottomColor: '',
        race: '',
        location: '',
        locationDescription: '',
        cameraView: '',
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
    };
  },
  methods: {
    updateLocationDescription() {
      // Update location and its description in formData
      this.formData.location = this.selectedLocation;
      this.formData.locationDescription = this.locationDescriptions[this.selectedLocation] || '';
    },

    async submitPrompt() {
      this.isLoading = true;
      this.progress = 0;

      let progressInterval = null;

      try {
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
