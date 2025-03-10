<script setup>
import { useThemeStore } from "@/stores/theme"; 

const themeStore = useThemeStore();
</script>

<template>
  <div class="transition-colors duration-1 dark:bg-black">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Terapkan tema dark sebelum Vue dijalankan */
html.dark {
  background-color: black;
}
</style>

<script>
// Jalankan sebelum Nuxt render
if (typeof window !== "undefined") {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
</script>
