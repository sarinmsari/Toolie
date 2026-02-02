<script setup>
import { ref, computed } from 'vue';
import CopyText from '../../components/CopyText.vue';

// State for the copy toast
const showToast = ref(false);
const copiedValue = ref('');

// Logic for Scenario 1: What is X% of Y?
const perc1 = ref(10);
const total1 = ref(100);
const res1 = computed(() => ((perc1.value / 100) * total1.value).toFixed(2));

// Logic for Scenario 2: X is what % of Y?
const val2 = ref(25);
const total2 = ref(100);
const res2 = computed(() => ((val2.value / total2.value) * 100).toFixed(2));

// Logic for Scenario 3: % Change
const oldVal = ref(100);
const newVal = ref(120);
const res3 = computed(() => {
  if (oldVal.value === 0) return 0;
  const diff = ((newVal.value - oldVal.value) / oldVal.value) * 100;
  return diff.toFixed(2);
});

// Improved Copy Function
const copyToClipboard = async (val, unit = '') => {
  const textToCopy = `${val}${unit}`;
  try {
    await navigator.clipboard.writeText(textToCopy);
    copiedValue.value = textToCopy;
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50 space-y-4 relative">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-2 tracking-widest">Percentage Calculator</h2>

    <div class="calc-card">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-600 mb-3">
        <span>What is</span>
        <input v-model.number="perc1" type="number" class="input-inline w-14" />
        <span>% of</span>
        <input v-model.number="total1" type="number" class="input-inline w-20" />
      </div>
      <div @click="copyToClipboard(res1)" class="result-box group">
        <span class="text-emerald-600 font-black text-lg">{{ res1 }}</span>
        <CopyText/>
      </div>
    </div>

    <div class="calc-card">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-600 mb-3">
        <input v-model.number="val2" type="number" class="input-inline w-16" />
        <span>is what % of</span>
        <input v-model.number="total2" type="number" class="input-inline w-20" />
      </div>
      <div @click="copyToClipboard(res2, '%')" class="result-box group">
        <span class="text-blue-600 font-black text-lg">{{ res2 }}%</span>
        <CopyText/>
      </div>
    </div>

    <div class="calc-card">
      <div class="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">Percentage Change (Gain/Loss)</div>
      <div class="flex items-center gap-2 text-xs font-bold text-slate-600 mb-3">
        <span>From</span>
        <input v-model.number="oldVal" type="number" class="input-inline w-16" />
        <span>to</span>
        <input v-model.number="newVal" type="number" class="input-inline w-16" />
      </div>
      <div @click="copyToClipboard(res3, '%')" class="result-box group">
        <span :class="['font-black text-lg', res3 >= 0 ? 'text-emerald-600' : 'text-red-500']">
          {{ res3 > 0 ? '+' : '' }}{{ res3 }}%
        </span>
        <CopyText/>
      </div>
    </div>

    <Transition name="slide-up">
      <div v-if="showToast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div class="bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-xs font-bold font-mono">{{ copiedValue }} copied!</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.calc-card {
  @apply bg-white p-4 rounded-2xl border border-slate-200 shadow-sm;
}

.input-inline {
  @apply p-1 bg-slate-100 border-b-2 border-slate-200 text-center outline-none focus:border-emerald-500 font-mono transition-all rounded;
}

.result-box {
  @apply flex justify-between items-center bg-slate-50 p-3 rounded-xl cursor-pointer hover:bg-white hover:ring-2 hover:ring-slate-200 active:scale-95 transition-all;
}

/* Animations */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-up-enter-from { transform: translate(-50%, 20px); opacity: 0; }
.slide-up-leave-to { transform: translate(-50%, 10px); opacity: 0; }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>