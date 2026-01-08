<script setup>
import { ref } from 'vue';

const props = defineProps(['modelValue']); // The output text
const copied = ref(false);

const copyToClipboard = async () => {
  if (!props.modelValue) return;
  
  try {
    await navigator.clipboard.writeText(props.modelValue);
    copied.value = true;
    
    // Reset the button state after 2 seconds
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
</script>

<template>
  <div class="relative group">
    <div class="flex justify-between items-center mb-2">
      <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Output</span>
      
      <button 
        @click="copyToClipboard"
        :class="[
          'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all',
          copied ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
        ]"
      >
        <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <div class="w-full p-3 bg-slate-900 rounded-lg border border-slate-800 shadow-inner">
      <p class="text-emerald-400 font-mono text-sm break-all whitespace-pre-wrap leading-relaxed">
        {{ modelValue || 'Waiting for input...' }}
      </p>
    </div>
  </div>
</template>