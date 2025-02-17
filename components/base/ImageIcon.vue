<template>
  <div>
    <img
      class="rounded-full size-12 object-cover hover:cursor-pointer border transition-all hover:border-gray-400"
      :src="image"
      alt="Profile"
    />
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: "https://placehold.co/400x400", 
  },
});
</script>
