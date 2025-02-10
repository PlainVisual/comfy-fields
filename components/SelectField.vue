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
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    label: string;
    modelValue: string;
    options: { value: string; label: string }[];
  }>();

  defineEmits(["update:modelValue"]);

</script>


<style scoped>

</style>