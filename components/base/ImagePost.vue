<template>
  <div class="rounded-2xl">
    <div v-if="images.length === 1" class="w-full h-52 flex items-center justify-center bg-gray-200 rounded-xl cursor-pointer" @click="openModal(0)">
      <img :src="images[0]" class="w-full h-full object-cover rounded-xl" />
    </div>

    <div v-else-if="images.length === 2" class="grid grid-cols-2 gap-1">
      <div v-for="(image, index) in images" :key="index" class="w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index)">
        <img :src="image" class="w-full h-full object-cover rounded-xl" />
      </div>
    </div>

    <div v-else-if="images.length === 3" class="grid grid-cols-3 gap-1">
      <div class="col-span-2 w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(0)">
        <img :src="images[0]" class="w-full h-full object-cover rounded-xl" />
      </div>
      <div class="flex flex-col gap-1 h-52">
        <div v-for="(image, index) in images.slice(1)" :key="index" class="w-full h-1/2 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index + 1)">
          <img :src="image" class="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </div>

    <div v-else-if="images.length === 4" class="grid grid-cols-2 gap-1">
      <div v-for="(image, index) in images" :key="index" class="w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index)">
        <img :src="image" class="w-full h-full object-cover rounded-xl" />
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div class="relative max-w-3xl w-full p-4">
        <button class="absolute top-2 right-2 text-white text-2xl" @click="closeModal">&times;</button>
        <img :src="selectedImage" class="w-full h-auto max-h-[90vh] object-contain rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const isModalOpen = ref(false);
const selectedImage = ref("");

const openModal = (index) => {
  selectedImage.value = props.images[index];
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
