<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="closeModal"
  >
    <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex">
      
      <div class="relative flex flex-col items-center justify-center w-7 mr-4">
        <div class="absolute w-[2px] h-[43vh] bg-gray-300 dark:bg-gray-600"></div>
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg dark:text-white">Buat Komunitas</h2>
          <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
        </div>

        <div class="flex flex-col mb-5">
          <label class="w-28 h-28 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer">
            <input type="file" class="hidden" id="image" accept="image/*" @change="handleImageUpload" />
            <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover rounded-full" />
            <p v-if="!imageUrl">📷</p>
          </label>
        </div>

        <div class="space-y-4">
          <div>
            <label for="name">Nama Komunitas</label>
            <BaseInput v-model="name" placeholder="Apa nama dari komunitas ini?" />
          </div>

          <div>
            <label for="description">Deskripsi</label>
            <BaseInputTextArea v-model="description" placeholder="Opsional, Anda bisa mengubahnya nanti" />
          </div>

          <div class="flex flex-col gap-3">
            <BaseDropdownPrimaryDropdown :items="categoryItems" v-model="category" dropdownName="Kategori" />
            <BaseDropdownPrimaryDropdown v-model="visibility" :items="visibilities" />
          </div>
        </div>

        <div class="flex justify-end mt-5 gap-3">
          <BaseButtonSecondaryButton buttonName="Drafts" @click="closeModal" />
          <BaseButtonPrimaryButton buttonName="Buat" @click="submitForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useKomunitas } from '../stores/Komunitas';
import Image from '~/components/icons/Image.vue';
import Cancel from '~/components/icons/Cancel.vue';


const isOpen = ref(false);
const imageUrl = ref(null);
const name = ref('');
const description = ref('');
const image = ref(null);
const visibility = ref('PUBLIC');
const category = ref('');
const categoryItems = ref([]);

const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = ""; 
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const komunitasStore = useKomunitas();
const fetchCategories = async () => {
  try {
    const categoryData = await komunitasStore.CategoryKomunitas();
    categoryItems.value = categoryData.map((item) => ({
      label: item.name, 
      value: item.id,    
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const submitForm = async () => {
  try {
    await komunitasStore.CreateKomunitas( 
      name.value,
      description.value,
      image.value,
      visibility.value,
      category.value
    );

    name.value = '';
    description.value = '';
    image.value = null;
    visibility.value = '';
    category.value = '';
    window.location.reload();

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Gagal membuat komunitas. Silakan coba lagi.');
  }
};

const visibilities = [
  { label: "Publik", value: "PUBLIC"},
  { label: "Privasi", value: "PRIVATE"}
]

onMounted(fetchCategories);
defineExpose({ openModal });
</script>
