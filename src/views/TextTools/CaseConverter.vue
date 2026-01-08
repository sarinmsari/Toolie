<script setup>
import { ref, computed } from 'vue';
import TextArea from '../../uiElements/TextArea.vue';

const input = ref('');
const copied = ref(false);

// Conversion Logic
const conversions = {
  upper: (str) => str.toUpperCase(),
  lower: (str) => str.toLowerCase(),
  title: (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  sentence: (str) => str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase()),
};

const transform = (type) => {
  if (!input.value) return;
  input.value = conversions[type](input.value);
};

const copyToClipboard = async () => {
  if (!input.value) return;
  try {
    await navigator.clipboard.writeText(input.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error('Copy failed', err);
  }
};

const clear = () => {
  input.value = '';
};
</script>

<template>
  <div class="p-4 flex flex-col h-full space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-sm font-bold text-slate-500 uppercase tracking-tight">Case Converter</h2>
      <button @click="clear" class="text-xs text-red-500 hover:underline">Clear</button>
    </div>

    <TextArea v-model="input" placeholder="Type or paste your text here..." class="flex-1"/>
    
    <div class="grid grid-cols-2 gap-2">
      <button @click="transform('upper')" class="btn-action">UPPERCASE</button>
      <button @click="transform('lower')" class="btn-action">lowercase</button>
      <button @click="transform('title')" class="btn-action">Title Case</button>
      <button @click="transform('sentence')" class="btn-action">Sentence case</button>
    </div>

    <button 
      @click="copyToClipboard"
      :disabled="!input"
      :class="[
        'w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm',
        !input ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 
        copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
      ]"
    >
      <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      {{ copied ? 'COPIED TO CLIPBOARD!' : 'COPY RESULT' }}
    </button>
  </div>
</template>

<style scoped>
.btn-action {
  @apply py-2 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium 
         text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all;
}
</style>