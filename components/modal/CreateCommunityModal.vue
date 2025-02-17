<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex">
      
      <div class="relative flex flex-col items-center justify-center w-10 mr-4">
        <div class="absolute w-[2px] h-[43vh] bg-gray-300 dark:bg-gray-600"></div>
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg dark:text-white">Buat Komunitas</h2>
          <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
        </div>

        <div class="flex flex-col mb-5">
          <label class="w-28 h-28 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer">
            <input type="file" class="hidden" @change="handleImageUpload" />
            <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover rounded-full" />
          </label>
        </div>

        <div class="space-y-4">
          <div>
            <label for="">Nama Komunitas</label>
            <BaseInput />
          </div>

          <div>
            <label for="">Deskripsi</label>
            <BaseInputTextArea placeholder="Opsional, Anda bisa mengubahnya nanti" />
          </div>

          <!-- <div>
            <label for="">Maksimal Anggota</label>
            <BaseDropdownTertiaryDropdown :items="['ada', 'adad']" />
          </div> -->

          <div class="flex flex-col gap-3">
            <BaseDropdownPrimaryDropdown dropdownName="Kategori" />
            <BaseDropdownPrimaryDropdown dropdownName="Publik" />
            <BaseDropdownSecondaryDropdown dropdownName="Semua bisa Memposting" />
          </div>
        </div>

        <div class="flex justify-end mt-5 gap-3">
          <BaseButtonSecondaryButton buttonName="Drafts" @click="closeModal" />
          <BaseButtonPrimaryButton buttonName="Buat" @click="createCommunity" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useKomunitas } from '../stores/Komunitas';
import { useRouter } from 'vue-router';
import Cancel from '~/components/icons/Cancel.vue';

const isOpen = ref(false);
const imageUrl = ref(null);

const openModal = () => { isOpen.value = true; };
const closeModal = () => { isOpen.value = false; };

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const komunitasStore = useKomunitas();
const router = useRouter();

const name = ref('');
const description = ref('');
const image = ref(null);
const imagePreview = ref(null);  
const visibility = ref('PUBLIC');
const category = ref('');
const categories = ref([]);

const fetchCategories = async () => {
    try {
        const categoryData = await komunitasStore.CategoryKomunitas();
        categories.value = categoryData;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

async function submitForm() {
    console.log('Name:', name.value);
    console.log('Description:', description.value);
    console.log('Category:', category.value);
    console.log('Visibility:', visibility.value);

    try {
        console.log(image.value);

        // Kirim data ke server menggunakan store
        const komunitas = await komunitasStore.CreateKomunitas(
            name.value,
            description.value,
            image.value,
            visibility.value,
            category.value
        );
        console.log('Komunitas created:', komunitas.community.id);

        alert('Komunitas berhasil dibuat.');

        // Reset form setelah sukses
        name.value = '';
        description.value = '';
        image.value = null;
        imagePreview.value = null; // Reset pratinjau gambar
        visibility.value = 'PUBLIC';
        category.value = '';

        // Pindah ke halaman list komunitas
        router.push(`/communitydetail/chat/${komunitas.community.id}`);
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Gagal membuat komunitas. Silakan coba lagi.');
    }
}

defineExpose({ openModal });
</script>
