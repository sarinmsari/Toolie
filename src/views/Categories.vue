<template>
  <div class="h-full w-full relative">
    <div class="grid grid-cols-1 gap-3">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="$router.push(`/category/${cat.id}`)"
        class="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 transition-all group shadow-sm"
      >
        <div class="text-2xl mr-4 bg-slate-100 p-2 rounded-lg group-hover:bg-emerald-50 text-emerald-600">
          {{ cat.icon }}
        </div>
        <div class="text-left">
          <div class="font-bold text-slate-800">{{ cat.name }}</div>
          <div class="text-xs text-slate-500">{{ cat.description }}</div>
        </div>
      </button>
    </div>
  </div>

</template>

<script setup>
const categories = [
  { id: 'text', name: 'Text Tools', icon: '📝', description: 'Case converter, Base64...' },
  { id: 'dev', name: 'Development', icon: '🛠️', description: 'JSON, RGB...' },
  { id: 'math', name: 'Quick Math', icon: '⚖️', description: 'Percentage, Unit conversion...' },
];
</script>