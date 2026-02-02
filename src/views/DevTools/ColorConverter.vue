<script setup>
import { ref, watch } from 'vue';

const hex = ref('#10b981');
const rgb = ref({ r: 16, g: 185, b: 129 });
const copyStatus = ref(''); // Tracks what was copied: 'hex' or 'rgb'

// Helpers (Same logic as before)
const hexToRgb = (hexStr) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};

const componentToHex = (c) => {
  const v = Math.max(0, Math.min(255, c)).toString(16);
  return v.length === 1 ? "0" + v : v;
};

// Sync Logic
watch(hex, (newHex) => {
  const converted = hexToRgb(newHex);
  if (converted) rgb.value = converted;
});

watch([() => rgb.value.r, () => rgb.value.g, () => rgb.value.b], ([r, g, b]) => {
  hex.value = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
});

// New Copy Logic with Indicator
const triggerCopy = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.value = type;
    setTimeout(() => { copyStatus.value = ''; }, 1500);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-6 tracking-widest">Color Converter</h2>

    <div 
      class="relative w-full h-24 rounded-2xl mb-6 shadow-inner border border-slate-200 flex items-center justify-center transition-all duration-300"
      :style="{ backgroundColor: hex }"
    >
      <Transition name="fade">
        <span v-if="copyStatus" class="bg-black/50 text-white px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm">
          {{ copyStatus.toUpperCase() }} COPIED!
        </span>
      </Transition>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase">HEX Code</label>
        <div class="relative group">
          <input 
            v-model="hex" 
            type="text" 
            class="w-full p-3 pl-10 bg-white border border-slate-200 rounded-xl font-mono text-sm uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <span class="absolute left-4 top-3 text-slate-400 font-mono">#</span>
          
          <button 
            @click="triggerCopy(hex, 'hex')" 
            class="absolute right-3 top-2.5 p-1 transition-colors"
            :class="copyStatus === 'hex' ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600'"
          >
             <svg v-if="copyStatus === 'hex'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
             <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase">RGB Values</label>
        <div class="flex gap-2">
          <div v-for="channel in ['r', 'g', 'b']" :key="channel" class="flex-1">
            <input 
              v-model.number="rgb[channel]" 
              type="number" min="0" max="255"
              class="w-full p-3 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-center"
            />
          </div>
        </div>
        
        <button 
          @click="triggerCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')"
          :class="[
            'w-full mt-2 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-tight',
            copyStatus === 'rgb' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
          ]"
        >
          {{ copyStatus === 'rgb' ? 'Copied RGB String!' : 'Copy RGB String' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>