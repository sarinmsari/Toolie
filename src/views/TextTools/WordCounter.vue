<script setup>
import { ref, computed } from 'vue';
import TextArea from '../../uiElements/TextArea.vue';

const input = ref('');

// Computation Logic
const stats = computed(() => {
  const text = input.value.trim();
  return {
    characters: input.value.length,
    charactersNoSpaces: input.value.replace(/\s/g, '').length,
    words: text ? text.split(/\s+/).length : 0,
    sentences: text ? text.split(/[.!?]+\s/).filter(Boolean).length : 0,
    paragraphs: text ? text.split(/\n+/).filter(Boolean).length : 0,
  };
});

const clear = () => {
  input.value = '';
};
</script>

<template>
  <div class="flex flex-col h-full space-y-4 bg-slate-50">
    <div class="flex justify-between items-center">
      <h2 class="text-sm font-bold text-slate-500 uppercase tracking-tight">Word Counter</h2>
      <button @click="clear" class="text-xs text-red-500 hover:underline font-medium">Clear All</button>
    </div>

    <TextArea
       v-model="input" 
      placeholder="Paste your text here to analyze..." 
      class="h-48 shadow-sm border-slate-200"
    />

    <div class="grid grid-cols-2 gap-3">
      <div class="stat-card">
        <span class="stat-label">Words</span>
        <span class="stat-value text-emerald-600">{{ stats.words }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Characters</span>
        <span class="stat-value text-blue-600">{{ stats.characters }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Sentences</span>
        <span class="stat-value text-purple-600">{{ stats.sentences }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Paragraphs</span>
        <span class="stat-value text-orange-600">{{ stats.paragraphs }}</span>
      </div>
    </div>

    <div class="bg-white p-3 rounded-xl border border-slate-200 space-y-2 shadow-sm">
      <div class="flex justify-between text-xs font-medium">
        <span class="text-slate-500">Characters (no spaces)</span>
        <span class="text-slate-800">{{ stats.charactersNoSpaces }}</span>
      </div>
      <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div 
          class="bg-emerald-500 h-full transition-all duration-500" 
          :style="{ width: input.length > 0 ? '100%' : '0%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  @apply bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-sm transition-transform active:scale-95;
}

.stat-label {
  @apply text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1;
}

.stat-value {
  @apply text-xl font-black;
}
</style>