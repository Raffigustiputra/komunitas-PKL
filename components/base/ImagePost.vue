<template>
  <div v-if="validImages.length > 0" class="rounded-2xl">
    <!-- Satu Gambar -->
    <div v-if="validImages.length === 1" class="w-full flex items-center justify-center bg-gray-200 rounded-xl cursor-pointer" @click="openModal(0)">
      <img :src="validImages[0]" class="max-w-full max-h-96 object-contain rounded-xl" />
    </div>

    <!-- Dua Gambar -->
    <div v-else-if="validImages.length === 2" class="grid grid-cols-2 gap-1">
      <div v-for="(image, index) in validImages" :key="index" class="w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index)">
        <img :src="image" class="w-full h-full object-cover rounded-xl" />
      </div>
    </div>

    <!-- Tiga Gambar -->
    <div v-else-if="validImages.length === 3" class="grid grid-cols-3 gap-1">
      <div class="col-span-2 w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(0)">
        <img :src="validImages[0]" class="w-full h-full object-cover rounded-xl" />
      </div>
      <div class="flex flex-col gap-1 h-52">
        <div v-for="(image, index) in validImages.slice(1)" :key="index" class="w-full h-1/2 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index + 1)">
          <img :src="image" class="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </div>

    <!-- Empat Gambar -->
    <div v-else-if="validImages.length === 4" class="grid grid-cols-2 gap-1">
      <div v-for="(image, index) in validImages" :key="index" class="w-full h-52 bg-gray-200 rounded-xl cursor-pointer" @click="openModal(index)">
        <img :src="image" class="w-full h-full object-cover rounded-xl" />
      </div>
    </div>

    <!-- Modal untuk Preview Gambar -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div class="relative max-w-3xl w-full p-4">
        <button class="absolute top-2 right-2 text-white text-2xl" @click="closeModal">&times;</button>
        <img :src="selectedImage" class="w-full h-auto max-h-[90vh] object-contain rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const validImages = computed(() => props.images.filter(img => img !== null && img !== ""));

const isModalOpen = ref(false);
const selectedImage = ref("");

const openModal = (index) => {
  selectedImage.value = validImages.value[index];
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
