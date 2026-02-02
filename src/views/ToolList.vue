<template>
  <div class="">
    <h2 class="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">{{ id }} Tools</h2>
    <div class="space-y-2">
      <div 
        v-for="tool in filteredTools" 
        :key="tool.path"
        @click="$router.push(tool.path)"
        class="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
      >
        <span class="font-medium text-slate-700">{{ tool.name }}</span>
        <span class="text-emerald-500">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['id']); // Receives the category ID from URL

const allTools = [
  //text
  { name: 'Base64 Converter', path: '/tool/base64', category: 'text' },
  { name: 'Character & Word Counter', path: '/tool/word-counter', category: 'text' },
  { name: 'Case Converter', path: '/tool/case-converter', category: 'text' },
  { name: 'Lorem Ipsum Generator', path: '/tool/lorem-ipsum', category: 'text' },
  //dev
  { name: 'JSON Formatter', path: '/tool/json-formatter', category: 'dev' },
  { name: 'Color Converter', path: '/tool/color-converter', category: 'dev' },
  //math
  { name: 'Percentage Calculator', path: '/tool/percentage-calculator', category: 'math'},
  { name: 'Unit Converter', path: '/tool/unit-converter', category: 'math'},
];

const filteredTools = computed(() => {
  return allTools.filter(t => t.category === props.id);
});
</script>