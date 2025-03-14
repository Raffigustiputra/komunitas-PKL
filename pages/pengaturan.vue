<script setup>
import { useThemeStore } from "@/stores/theme";
import { computed } from "vue";

const themeStore = useThemeStore();
const isDark = computed({
  get: () => themeStore.isDarkMode,
  set: (value) => themeStore.toggleDarkMode()
});
</script>

<template>
  <div class="p-6 flex items-center gap-4">
    <span class="text-gray-700 dark:text-gray-300">Dark Mode</span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" v-model="isDark" />
      <div class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors duration-300">
        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out"
             :class="isDark ? 'translate-x-5' : 'translate-x-0'">
        </div>
      </div>
    </label>
  </div>
</template>
