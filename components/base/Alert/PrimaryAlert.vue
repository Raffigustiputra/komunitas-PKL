<template>
  <div
    v-if="visible"
    :class="['fixed bottom-5 left-1/2 gap-48 -translate-x-1/2 min-w-[50vh] flex items-center justify-between p-2 px-5 rounded-lg shadow-lg text-white', bgColor]"
  >
    <div class="flex items-center gap-2">
      <span class="font-semibold">{{ message }}</span>
    </div>
    <button @click="close" class="w-8 h-8 ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: 'Berhasil Login!'
  },
  type: {
    type: String,
    default: 'info', 
  }
});

const visible = ref(true);

const close = () => {
  visible.value = false;
};

const bgColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-[#3D3BF3]';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-[#3D3BF3]';
  }
});
</script>
