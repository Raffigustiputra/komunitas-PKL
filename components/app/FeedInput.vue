<<<<<<< HEAD
  <template>
    <div class="flex gap-3 bg-white p-3 rounded-3xl dark:bg-[#000000] dark:text-white">
      <div>
        <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : ''" />
      </div>

      <div class="flex flex-col w-full">
        <div>
          <BaseDropdownSecondaryDropdown
            v-if="isDropdownVisible"
            dropdownName="Semua dapat berkomentar"
            :items="['Option 1', 'Option 2', 'Option 3']"
            class="mb-3"
          />
          <BaseInputTextArea @click="showDropdowns" placeholder="Hai, ada apa?" />
          <div class="flex items-center gap-3">
            <BaseDropdownPrimaryDropdown
            v-if="isDropdownVisible"
            v-model="selectedVisibility"
            class="mt-3 mb-2"
            />
            <BaseDropdownCategoryDropdown  v-if="isDropdownVisible"  :items="dropdownItems" v-model="community" />
          </div>
        </div>
        
        <div class="flex justify-between">
          <div class="flex gap-3">
            <input
            type="file"
              accept=".pdf,.doc,.docx,.txt"
              hidden
              ref="docInput"
              @change="handleFileSelect"
            />
            <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" />
            <input
              type="file"
              accept="image/*"
              hidden
              ref="imageInput"
              @change="handleFileSelect"
            />
            <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
          </div>
          <div class="flex gap-3">
            <BaseButtonSecondaryButton buttonName="Drafts" />
            <BaseButtonPrimaryButton buttonName="Posting" />
          </div>
=======
<template>
  <div v-if="useAuth().userToken.value" class="flex gap-3 bg-white p-3 rounded-3xl dark:bg-[#000000] dark:text-white">
    <div>
      <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : ''" />
    </div>

    <div class="flex flex-col w-full">
      <div>
        <BaseDropdownSecondaryDropdown
          v-if="isDropdownVisible"
          dropdownName="Semua dapat berkomentar"
          :items="['Option 1', 'Option 2', 'Option 3']"
          class="mb-3"
        />
        <BaseInputTextArea @click="showDropdowns" placeholder="Hai, ada apa?" v-model="description" />
        <div v-if="imagePreview || attachment" class="mb-4">
          <div v-if="imagePreview">
              <BaseImagePost :images="[imagePreview]" class="max-w-[10vh]"/> 
          </div>
          <div v-if="attachment">
              <p class="text-sm text-gray-600">Attachment: {{ attachment.name }}</p>
          </div>
        </div>
        <div v-if="isDropdownVisible" class="flex items-center gap-3 mt-3 mb-2">
          <BaseDropdownPrimaryDropdown
          v-model="visibility"
          :items="visibilities"
          />
          <BaseDropdownPrimaryDropdown :items="communityList" v-model="community" dropdownName="Pilih Komunitas" />
        </div>
      </div>
      
      <div class="flex justify-between" >
        <div class="flex gap-3" @click="showDropdowns"  >
          <input
          type="file"
            accept=".pdf,.doc,.docx,.txt"
            hidden
            ref="docInput"
            @change="handleFileSelect"
          />
          <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" />
          <input
            type="file"
            accept="image/*"
            hidden
            ref="imageInput" @change="(e) => handleFileSelect('image', e)"
          />
          <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
        </div>
        <div class="flex gap-3">
          <BaseButtonSecondaryButton buttonName="Drafts" />
          <BaseButtonPrimaryButton buttonName="Posting" @click="submitForm" />
>>>>>>> 77a6c2e6ef47cbefefc695f5e924ec8db0a4b015
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import Attachment from "~/components/icons/Attachment.vue";
  import Image from "~/components/icons/Image.vue";
  import { useAuth } from "~/stores/Auth.js";
  import { useKomunitas } from '../stores/Komunitas';

<<<<<<< HEAD
  const accountStore = useAuth();
  const account = ref([]);
  const loading = ref(true);
  const komunitasStore = useKomunitas();
  const community = ref('');
  const dropdownItems = ref([]);
=======
const accountStore = useAuth();
const account = ref([]);
const loading = ref(true);
const komunitasStore = useKomunitas();
const postStore = usePosts();
const community = ref('');
const communityList = ref([]);
const docInput = ref(null);
const imagePreview = ref(null);
const imageInput = ref(null);
const description = ref('');
const image = ref(null);
const attachment = ref(null);
const visibility = ref('');
const isDropdownVisible = ref(false);
>>>>>>> 77a6c2e6ef47cbefefc695f5e924ec8db0a4b015

  const fetchData = async () => {
    loading.value = true;
    try {
<<<<<<< HEAD
      const auth = await accountStore.profile();
      account.value = auth; 
      console.log("Auth Response:", account.value);
=======
        const dataKomunitas = await komunitasStore.fetchKomunitas();
        communityList.value = dataKomunitas.map((item) => ({
            label: item.name,
            value: item.id,
        }));
>>>>>>> 77a6c2e6ef47cbefefc695f5e924ec8db0a4b015
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };

<<<<<<< HEAD
  const fetchKomunitas = async () => {
      try {
          const dataKomunitas = await komunitasStore.fetchKomunitas();
          dropdownItems.value = dataKomunitas.map((item) => ({
              label: item.name,
              value: item.id,
          }));
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  onMounted(() => {
    fetchData();
    fetchKomunitas()
  });
=======
const submitForm = async () => {
    try {
        await postStore.createPost(
            description.value,
            image.value,
            attachment.value,
            visibility.value,
            community.value,
            account.value.id
        );

        description.value = '';
        image.value = null;
        attachment.value = null;
        visibility.value = '';
        community.value = '';

        window.location.reload();
    } catch (error) {
        console.error('Kenapa ini:', error);
        alert('Gagal membuat postingan');
    }
};

onMounted(() => {
  fetchData();
  fetchKomunitas()
});

const visibilities = [
  { label: "Publik", value: "PUBLIC"},
  { label: "Privasi", value: "PRIVATE"}
]
>>>>>>> 77a6c2e6ef47cbefefc695f5e924ec8db0a4b015

  const docInput = ref(null);
  const imageInput = ref(null);
  const isDropdownVisible = ref(false);

  const openDocPicker = () => {
    docInput.value.click();
  };

<<<<<<< HEAD
  const openImagePicker = () => {
    imageInput.value.click();
  };
=======
const handleFileSelect = (type) => {
    const fileInput = type === 'image' ? imageInput.value : docInput.value;
    const file = fileInput.files[0];
    if (file) {
        if (type === 'image') {
            image.value = file;
            imagePreview.value = URL.createObjectURL(file); 
        } else {
            attachment.value = file;
        }
        console.log(`Selected ${type}:`, file);
    }
};
>>>>>>> 77a6c2e6ef47cbefefc695f5e924ec8db0a4b015

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const showDropdowns = () => {
    isDropdownVisible.value = true;
  };
  </script>
