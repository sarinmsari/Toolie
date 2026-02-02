<script setup>
import { ref, watch, onMounted } from 'vue';
import { saveToStorage, getFromStorage } from '../../utils/storage';
import TextArea from '../../uiElements/TextArea.vue';
import OutputBox from '../../components/OutputBox.vue';

const input = ref('');
const error = ref('');
const formattedOutput = ref('');

// Load saved data
onMounted(() => {
  getFromStorage('json_input', (saved) => {
    if (saved) {
      input.value = saved;
      processJson('format');
    }
  });
});

// Auto-save input
watch(input, (newVal) => {
  saveToStorage('json_input', newVal);
  if (!newVal) {
    formattedOutput.value = '';
    error.value = '';
  }
});

const processJson = (mode) => {
  if (!input.value.trim()) return;
  
  try {
    error.value = '';
    const obj = JSON.parse(input.value);
    
    if (mode === 'format') {
      formattedOutput.value = JSON.stringify(obj, null, 2);
    } else if (mode === 'minify') {
      formattedOutput.value = JSON.stringify(obj);
    }
  } catch (e) {
    error.value = "Invalid JSON: " + e.message;
    formattedOutput.value = '';
  }
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">JSON Formatter</h2>

    <div class="space-y-2 mb-4">
      <div class="flex justify-between items-center">
        <span class="text-[10px] font-black text-slate-400 uppercase">Input JSON</span>
        <button @click="input = ''" class="text-[10px] text-red-500 font-bold hover:underline">CLEAR</button>
      </div>
      <TextArea 
        v-model="input" 
        placeholder='Paste raw JSON here... e.g. {"id":1,"name":"Toolie"}'
        class="h-32 font-mono text-xs"
      />
    </div>

    <div class="flex gap-2 mb-6">
      <button 
        @click="processJson('format')"
        class="flex-1 py-2 bg-emerald-600 text-white text-[10px] font-black rounded-lg hover:bg-emerald-700 shadow-sm transition-all"
      >
        BEAUTIFY
      </button>
      <button 
        @click="processJson('minify')"
        class="flex-1 py-2 bg-slate-800 text-white text-[10px] font-black rounded-lg hover:bg-slate-900 shadow-sm transition-all"
      >
        MINIFY
      </button>
    </div>

    <div class="flex-1 flex flex-col space-y-2 overflow-hidden">
      <div class="flex justify-between items-center">
        <span v-if="error" class="text-[10px] font-regular text-red-500">{{ error }}</span>
        <span v-else class="text-[10px] font-black text-slate-400 uppercase">Result</span>
      </div>
      
      <div class="flex-1 min-h-0">
         <OutputBox 
          :modelValue="formattedOutput" 
          placeholder="Formatted output will appear here..."
          class="h-full font-mono text-xs"
        />
      </div>
    </div>
  </div>
</template>