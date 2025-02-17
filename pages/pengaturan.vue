<template>
  <button
    @click="toggleDarkMode"
    class="mt-4 px-4 py-2 bg-blue-500 dark:bg-yellow-500 text-white dark:text-black rounded-lg transition-colors"
  >
    Toggle Dark Mode
  </button>
</template>

<script setup>
import { onMounted } from "vue";
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark"); 
  localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
};

onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});
</script>
