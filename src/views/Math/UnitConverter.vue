<script setup>
import { ref, watch, computed } from 'vue';
import CopyText from '../../components/CopyText.vue';

const amount = ref(1);
const category = ref('length');
const fromUnit = ref('meters');
const toUnit = ref('feet');
const showToast = ref(false);

const unitData = {
  length: {
    units: ['meters', 'kilometers', 'feet', 'inches', 'miles', 'yards'],
    ratios: { meters: 1, kilometers: 0.001, feet: 3.28084, inches: 39.3701, miles: 0.000621371, yards: 1.09361 }
  },
  weight: {
    units: ['kilograms', 'grams', 'pounds', 'ounces'],
    ratios: { kilograms: 1, grams: 1000, pounds: 2.20462, ounces: 35.274 }
  },
  temperature: {
    units: ['celsius', 'fahrenheit', 'kelvin']
  }
};

// Handle dynamic unit selection when category changes
watch(category, (newCat) => {
  fromUnit.value = unitData[newCat].units[0];
  toUnit.value = unitData[newCat].units[1];
});

const result = computed(() => {
  if (category.value === 'temperature') {
    let temp = amount.value;
    // Normalize to Celsius first
    if (fromUnit.value === 'fahrenheit') temp = (temp - 32) * 5/9;
    if (fromUnit.value === 'kelvin') temp = temp - 273.15;
    
    // Convert to target
    if (toUnit.value === 'fahrenheit') return (temp * 9/5 + 32).toFixed(2);
    if (toUnit.value === 'kelvin') return (temp + 273.15).toFixed(2);
    return temp.toFixed(2);
  } else {
    const base = amount.value / unitData[category.value].ratios[fromUnit.value];
    return (base * unitData[category.value].ratios[toUnit.value]).toFixed(4);
  }
});

const copyResult = () => {
  navigator.clipboard.writeText(result.value);
  showToast.value = true;
  setTimeout(() => showToast.value = false, 2000);
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50 space-y-4">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-2 tracking-widest">Unit Converter</h2>

    <div class="flex p-1 bg-slate-200 rounded-xl">
      <button 
        v-for="cat in ['length', 'weight', 'temperature']" 
        :key="cat"
        @click="category = cat"
        :class="['flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase', 
                 category === cat ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500']"
      >
        {{ cat }}
      </button>
    </div>

    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div class="space-y-2">
        <div class="flex justify-between text-[10px] font-black text-slate-400 uppercase">
          <span>From</span>
          <select v-model="fromUnit" class="bg-white border-none outline-none text-emerald-600 capitalize">
            <option v-for="u in unitData[category].units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <input v-model.number="amount" type="number" class="w-full text-2xl font-mono font-bold border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-colors pb-2" />
      </div>

      <div class="flex justify-center -my-4">
        <button @click="[fromUnit, toUnit] = [toUnit, fromUnit]" class="bg-slate-100 p-2 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 transition-all border border-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        </button>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between text-[10px] font-black text-slate-400 uppercase">
          <span>To</span>
          <select v-model="toUnit" class="bg-white border-none outline-none text-emerald-600 capitalize">
            <option v-for="u in unitData[category].units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div @click="copyResult" class="flex justify-between items-baseline group cursor-pointer">
          <span class="text-3xl font-mono font-black text-slate-800 break-all">{{ result }}</span>
          <span class="text-[9px] font-bold text-slate-300 group-hover:text-emerald-500 transition-colors uppercase"><CopyText/></span>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showToast" class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-lg">
        COPIED TO CLIPBOARD
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
select { cursor: pointer; }
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
</style>