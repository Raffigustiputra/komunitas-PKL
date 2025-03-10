<script setup>
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>

<template>
  <div class="p-6">

    <button
      @click="themeStore.toggleDarkMode"
      class="mt-4 px-4 py-2 rounded-full transition-colors duration-300"
      :class="themeStore.isDarkMode ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'"
    >
      Toggle Dark Mode
    </button>
  </div>
</template>
