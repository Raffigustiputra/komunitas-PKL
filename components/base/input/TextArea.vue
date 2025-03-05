<template>
  <textarea
    v-model="tweet"
    class="w-full resize-none bg-transparent border bg-white dark:bg-black border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
    :placeholder="placeholder"
    :rows="rows"
    @input="adjustHeight"
    ref="textarea"
  ></textarea>
</template>

<script setup>
import { ref, nextTick } from "vue";

const tweet = ref("");
const textarea = ref(null);

const adjustHeight = () => {
  nextTick(() => {
    textarea.value.style.height = "auto";
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  });
};

defineProps({
  placeholder: {
    type: String,
    default: "lorem", 
  },
  rows: {
    type: Number,
    default: 1, // Default 3 baris
  },
});
</script>

<style scoped>
textarea {
  overflow: hidden;
}
</style>
