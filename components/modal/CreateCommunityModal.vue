<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal">
    <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">
        <div class="px-5 max-h-[85vh] overflow-y-auto custom-scroll">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg dark:text-white">Buat Komunitas</h2>
          <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
        </div>

          <div class="flex flex-col mb-5 gap-4">
            <label class="w-full h-40 flex items-center justify-center border border-black bg-[#ECECEC] cursor-pointer relative">
              <input type="file" class="hidden" id="banner" accept="image/*" @change="handleBannerUpload" />
              <img v-if="bannerUrl" :src="bannerUrl" class="w-full h-full object-cover" />
              <p v-if="!bannerUrl">📷 Upload Banner</p>
              <button v-if="bannerUrl" @click.stop="removeBanner" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
            </label>
            <label class="w-28 h-28 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer relative">
              <input type="file" class="hidden" id="image" accept="image/*" @change="handleImageUpload" />
              <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover rounded-full" />
              <p v-if="!imageUrl">📷</p>
              <button v-if="imageUrl" @click.stop="removeImage" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <label for="name" class="dark:text-white">Nama Komunitas</label>
              <BaseInput v-model="name" placeholder="Apa nama dari komunitas ini?" />
            </div>

            <div>
              <label for="description" class="dark:text-white">Deskripsi</label>
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
const bannerUrl = ref(null);
const banner = ref(null);

const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = "";
};

const handleBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    banner.value = file;
    bannerUrl.value = URL.createObjectURL(file);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const removeBanner = () => {
  banner.value = null;
  bannerUrl.value = null;
};

const removeImage = () => {
  image.value = null;
  imageUrl.value = null;
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
      banner.value,
      visibility.value,
      category.value
    );

    name.value = '';
    description.value = '';
    image.value = null;
    banner.value = null;
    visibility.value = '';
    category.value = '';
    window.location.reload();

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Gagal membuat komunitas. Silakan coba lagi.');
  }
};

const visibilities = [
  { label: "Publik", value: "PUBLIC" },
  { label: "Privasi", value: "PRIVATE" }
]

onMounted(fetchCategories);
defineExpose({ openModal });
</script>