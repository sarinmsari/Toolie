<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { saveToStorage, getFromStorage } from '../../utils/storage';
import TextArea from '../../uiElements/TextArea.vue';
import OutputBox from '../../components/OutputBox.vue';

const input = ref('');

// 1. Load data when the tool opens
onMounted(() => {
  getFromStorage('base64_input', (savedData) => {
    if (savedData) input.value = savedData;
  });
});

// 2. Watch for changes and save automatically
watch(input, (newVal) => {
  saveToStorage('base64_input', newVal);
});

const output = computed(() => {
  try {
    return input.value ? btoa(input.value) : '';
  } catch {
    return 'Invalid input...';
  }
});
</script>

<template>
  <div class="tool-container">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Text to Base64</h2>
    <span class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Input</span>
    <TextArea v-model="input" placeholder="Type here to encode..."/>
    <OutputBox :modelValue="output" class="mt-4"/>
  </div>
</template>