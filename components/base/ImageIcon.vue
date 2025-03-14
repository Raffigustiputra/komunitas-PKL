<template>
  <div>
    <img
      class="min-w-11 min-h-10 rounded-full size-11 object-cover hover:cursor-pointer border transition-all hover:border-gray-400"
      :src="image"
      alt="Profile"
    />
  </div>
</template>

<script setup>
import defaultImage from '/public/assets/default_user_profile_photo.jpg';
defineProps({
  image: {
    type: String,
    default: defaultImage, 
  },
}); 
</script>
