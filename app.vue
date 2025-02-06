<template>
  <div class="container-lg flex flex-col gap-8 lg:flex-row p-4 font-display h-full">
    <div class="comfy-fields basis-full lg:basis-2/6 flex flex-col justify-center">
      <h1 class="text-3xl font-black mb-2">Comfy fields</h1>
    <form class="flex flex-col gap-6" @submit.prevent="submitPrompt">
      <div class="flex flex-col">
        <label
    <label for="gender"></label>
    <select id="gender" v-model="formData.gender">
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="non-binary">Non-Binary</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
  <label for="hairstyle"></label>
  <select id="hairstyle" v-model="formData.hairStyle">
    <option value="">Select Hairstyle</option>
    <option value="short">Short Hair</option>
    <option value="long">Long Hair</option>
    <option value="curly">Curly Hair</option>
    <option value="straight">Straight Hair</option>
    <option value="wavy">Wavy Hair</option>
    <option value="buzz_cut">Buzz Cut</option>
    <option value="bob_cut">Bob Cut</option>
    <option value="ponytail">Ponytail</option>
    <option value="braided">Braided Hair</option>
    <option value="undercut">Undercut</option>
  </select>
</div>
<div class="flex flex-col">
    <label for="hairColor"></label>
    <select id="hairColor" v-model="formData.hairColor">
      <option value="">Select Hair Color</option>
      <option value="blonde">Blonde</option>
      <option value="brown">Brown</option>
      <option value="black">Black</option>
      <option value="red">Red</option>
      <option value="gray">Gray</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="race"></label>
    <select id="race" v-model="formData.race">
      <option value="">Select Race</option>
      <option value="asian">Asian</option>
      <option value="caucasian">Caucasian</option>
      <option value="african">African</option>
      <option value="latino">Latino</option>
      <option value="middle eastern">Middle Eastern</option>
      <option value="indigenous">Indigenous</option>
      <option value="pacific islander">Pacific Islander</option>
      <option value="mixed race">Mixed Race</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="topClothing"></label>
    <select id="topClothing" v-model="formData.topClothing">
      <option value="">Select Top Clothing</option>
      <option value="t-shirt">T-Shirt</option>
      <option value="shirt">Shirt</option>
      <option value="sweater">Sweater</option>
      <option value="jacket">Jacket</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="topColor"></label>
    <select id="topColor" v-model="formData.topColor">
      <option value="">Select Top Color</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="yellow">Yellow</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="bottomClothing"></label>
    <select id="bottomClothing" v-model="formData.bottomClothing">
      <option value="">Select Bottom Clothing</option>
      <option value="jeans">Jeans</option>
      <option value="shorts">Shorts</option>
      <option value="skirt">Skirt</option>
      <option value="trousers">Trousers</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="bottomColor"></label>
    <select id="bottomColor" v-model="formData.bottomColor">
      <option value="">Select Bottom Color</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="yellow">Yellow</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="location"></label>
    <select id="location" v-model="selectedLocation" @change="updateLocationDescription">
      <option value="">Select Location</option>
      <option value="Amsterdam, Netherlands">Amsterdam, Netherlands</option>
      <option value="Tokyo, Japan">Tokyo, Japan</option>
      <option value="Paris, France">Paris, France</option>
      <option value="New York City, USA">New York City, USA</option>
      <option value="Dubai, UAE">Dubai, UAE</option>
      <option value="Rio de Janeiro, Brazil">Rio de Janeiro, Brazil</option>
      <option value="Sydney, Australia">Sydney, Australia</option>
      <option value="Cairo, Egypt">Cairo, Egypt</option>
      <option value="London, UK">London, UK</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label for="cameraView"></label>
    <select id="cameraView" v-model="formData.cameraView">
      <option value="">Select Camera View</option>
      <option value="close-up">Close-up</option>
      <option value="wide angle">Wide angle</option>
      <option value="eye-level headshot">eye-level headshot</option>
      <option value="over the shoulder">Over the shoulder</option>
      <option value="low angle">Low angle</option>
      <option value="high angle">High angle</option>
      <option value="side view">Side view</option>
      <option value="front view">Front view</option>
    </select>
  </div>
  
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
      formData: {
        gender: '',
        hairColor: '',
        hairStyle: '',
        topClothing: '',
        bottomClothing: '',
        topColor: '',
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
