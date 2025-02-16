<template>
  <div >
    <label :for="id">{{ label }}</label>
    <select
    class="w-full" 
    :id="id" 
    :value="modelValue" 
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
    
    <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Radio Button for Weight Option -->
    <div class="mt-4">
      <label>
        <input type="checkbox" 
               v-model="addWeight" 
               @change="resetSettings" />
        Add weight to option
      </label>
    </div>
    <div v-if="addWeight" class="mt-4">
      <label>Weight Adjustment:</label>
      <select v-model="weightAdjustment" class="w-full" @change="emitWeightChange">
        <option value="more">Weight More</option>
        <option value="less">Weight Less</option>
      </select>
    </div>

    <!-- Slider for Weight -->
    <div v-if="addWeight" class="mt-4">
      <label>Adjust Weight (0 to 1.5):</label>
      <input type="range" 
             v-model.number="weight" 
             min="0" max="1.5" 
             step="0.01" 
             class="w-full" 
             @input="emitWeightChange" />
      <p>{{ formattedWeight }}</p> <!-- Display weight with two decimals -->
      
    </div>

  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps<{
    id: string;
    label: string;
    modelValue: string;
    options: { value: string; label: string }[];
  }>();

 const emit = defineEmits(["update:modelValue", "weightChange"]);

const addWeight = ref(false);
const weightAdjustment = ref("more");
const weight = ref<number>(0);

const formattedWeight = computed(() => weight.value.toFixed(2));

const resetSettings = () => {
    if (!addWeight.value) {
      weightAdjustment.value = "more"; // Reset weight adjustment option to "more"
      weight.value = 0; // Reset weight to 0

      emit('weightChange', { field: props.id, weight: weight.value, adjustment: weightAdjustment.value });
    }
  };

  const emitWeightChange = () => {
  console.log("Field ID in emitWeightChange:", props.id);
  if (!props.id) {
    console.error("emitWeightChange: Missing field ID");
    return;
  }
  emit('weightChange', { field: props.id, weight: weight.value, adjustment: weightAdjustment.value });
};


</script>


<style scoped>

</style>