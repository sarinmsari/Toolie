<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { saveToStorage, getFromStorage } from '../../utils/storage';
import TextArea from '../../uiElements/TextArea.vue';
import OutputBox from '../../components/OutputBox.vue';

const input = ref('');
const mode = ref('encode'); // 'encode' or 'decode'

onMounted(() => {
  getFromStorage('base64_input', (savedData) => {
    if (savedData) input.value = savedData;
  });
  getFromStorage('base64_mode', (savedMode) => {
    if (savedMode) mode.value = savedMode;
  });
});

watch(input, (newVal) => saveToStorage('base64_input', newVal));
watch(mode, (newMode) => saveToStorage('base64_mode', newMode));

const output = computed(() => {
  if (!input.value) return '';
  try {
    return mode.value === 'encode' 
      ? btoa(input.value) 
      : atob(input.value.trim().replace(/\s/g, '')); // Remove whitespace for decoding
  } catch (err) {
    return mode.value === 'decode' 
      ? 'Error: Input is not a valid Base64 string' 
      : 'Error: Character encoding issue';
  }
});
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Base64 Converter</h2>

    <div class="flex p-1 bg-slate-200 rounded-xl mb-6">
      <button 
        @click="mode = 'encode'"
        :class="[
          'flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200',
          mode === 'encode' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        ]"
      >
        ENCODE TEXT
      </button>
      <button 
        @click="mode = 'decode'"
        :class="[
          'flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200',
          mode === 'decode' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        ]"
      >
        DECODE BASE64
      </button>
    </div>

    <div class="flex flex-col space-y-2">
      <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        {{ mode === 'encode' ? 'Source Text' : 'Base64 Hash' }}
      </span>
      <TextArea 
        v-model="input" 
        :placeholder="mode === 'encode' ? 'Enter plain text...' : 'Paste Base64 string...'"
      />
    </div>

    <div class="mt-6 flex flex-col space-y-2">
      <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Result</span>
      <OutputBox :modelValue="output" />
    </div>
  </div>
</template>