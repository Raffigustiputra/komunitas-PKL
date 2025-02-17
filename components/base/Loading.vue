<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center">
    <div class="w-7 h-7 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean, 
});
</script>
