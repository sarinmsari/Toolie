<script setup>
import { ref, computed } from 'vue';
import OutputBox from '../../components/OutputBox.vue';

const count = ref(3);
const type = ref('sentences'); // 'paragraphs', 'sentences', 'words'

const sourceText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
  "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
  "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
  "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
  "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi."
];

const generatedText = computed(() => {
  if (count.value <= 0) return "";
  
  let result = [];
  if (type.value === 'paragraphs') {
    for (let i = 0; i < count.value; i++) {
      // Shuffle/Pick sentences to make paragraphs feel unique
      const p = [...sourceText].sort(() => 0.5 - Math.random()).slice(0, 5).join(" ");
      result.push(p);
    }
    return result.join("\n\n");
  } 
  
  if (type.value === 'sentences') {
    return sourceText.slice(0, count.value).join(" ");
  }

  if (type.value === 'words') {
    const allWords = sourceText.join(" ").split(" ");
    return allWords.slice(0, count.value).join(" ") + ".";
  }

  return "";
});
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Lorem Ipsum Generator</h2>

    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-4">
      
      <div class="flex p-1 bg-slate-100 rounded-lg">
        <button 
          v-for="option in ['paragraphs', 'sentences', 'words']" 
          :key="option"
          @click="type = option"
          :class="[
            'flex-1 py-1.5 text-[10px] font-black uppercase rounded-md transition-all',
            type === option ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          ]"
        >
          {{ option }}
        </button>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-600">Generate Amount</span>
        <input 
          v-model.number="count" 
          type="number" 
          min="1" 
          max="50"
          class="w-16 p-1 text-center border rounded-md font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

    </div>

    <div class="flex flex-col space-y-2 flex-1">
      <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Generated Placeholder Text</span>
      <OutputBox :modelValue="generatedText" class="flex-1" />
    </div>
  </div>
</template>