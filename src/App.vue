<template>
  <div class="w-[350px] min-h-[450px] bg-slate-50 flex flex-col font-sans">
    <header class="h-14 bg-emerald-600 flex items-center px-4 shadow-md shrink-0">
      <button 
        v-if="route.path !== '/'" 
        @click="goBack"
        class="mr-3 p-1 hover:bg-emerald-700 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-white font-bold text-lg tracking-tight">Toolie</h1>
    </header>

    <main class="flex-1 overflow-y-auto p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const goBack = () => {
  if (route.path.includes('/tool/')) {
    // Logic to go back to the correct category list
    // Or simpler: just use router.back()
    router.back();
  } else {
    router.push('/');
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>