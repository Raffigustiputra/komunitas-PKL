<template>
    <div v-if="isOpen" @click.self="closeModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[350px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-lg dark:text-white">Buat Postingan</h2>
                <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
            </div>

            <div class="flex items-center mb-4 gap-2">
                <BaseDropdownPrimaryDropdown v-model="visibility" :items="visibilities" />
                <BaseDropdownPrimaryDropdown v-model="community" :items="communityItems" dropdownName="Pilih Komunitas" />
            </div>
            
            <div class="flex mb-4 gap-4">
                <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : '/assets/default_user_profile_photo.jpg'" />
                <BaseInputTextArea :rows="3" placeholder="Ada Keseruan apa hari ini ??" v-model="description" />
            </div>

            <div v-if="imagePreview || attachment" class="mb-4">
                <div v-if="imagePreview">
                    <BaseImagePost :images="[imagePreview]" class="max-w-[10vh]"/> 
                </div>
                <div v-if="attachment">
                    <p class="text-sm text-gray-600">Attachment: {{ attachment.name }}</p>
                </div>
            </div>

            <div class="flex gap-3">
                <input type="file" accept=".pdf,.doc,.docx,.txt" hidden ref="docInput" @change="(e) => handleFileSelect('attachment', e)" />
                <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" class="text-[#3D3BF3]" />
                <input type="file" accept="image/*" hidden ref="imageInput" @change="(e) => handleFileSelect('image', e)" />
                <BaseButtonIconButton :icon="Image" @click="openImagePicker" class="text-[#3D3BF3]" />  
                <BaseButtonIconButton :icon="Emot" @click="showEmojiPicker = !showEmojiPicker" class="text-[#3D3BF3]" />
                <EmojiPicker v-if="showEmojiPicker" @select="handleEmojiSelect" />
            </div>

            <div class="flex justify-end gap-3">
                <BaseButtonSecondaryButton buttonName="Draft" @click="saveDraft" />
                <BaseButtonPrimaryButton :disabled="!isFormValid" buttonName="Buat" @click="submitForm" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cancel from '~/components/icons/Cancel.vue';
import Attachment from '~/components/icons/Attachment.vue';
import Image from "~/components/icons/Image.vue";
import Emot from "~/components/icons/Emot.vue";
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { useKomunitas } from '../stores/Komunitas';
import { useAuth } from "~/stores/Auth.js";

const accountStore = useAuth();
const account = ref([]);
const loading = ref(true);
const isOpen = ref(false);
const imageInput = ref(null);
const showEmojiPicker = ref(false);
const komunitasStore = useKomunitas();
const community = ref(null);
const communityItems = ref([]);  
const postStore = usePosts();
const docInput = ref(null);
const imagePreview = ref(null);
const description = ref('');
const image = ref(null);
const attachment = ref(null);
const visibility = ref('');
const openModal = () => { isOpen.value = true;   document.body.style.overflow = "hidden";  };
const closeModal = () => { isOpen.value = false;   document.body.style.overflow = "";  };

const fetchAccount = async () => {
  loading.value = true;
  try {
    const auth = await accountStore.profile();
    account.value = auth; 
    console.log("Auth Response:", account.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

const fetchKomunitas = async () => {
    try {
        const dataKomunitas = await komunitasStore.fetchJoinedKomunitas();
        communityItems.value = dataKomunitas.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

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
        closeModal();
    } catch (error) {
        console.log({
            description: description.value,
            image: image.value,
            visibility: visibility.value,
            attachment: attachment.value,
            community: community.value,
            user: account.value.id
        });

        console.error('Kenapa ini:', error);
        alert('Gagal membuat postingan');
    }
};

const openDocPicker = () => {
    docInput.value.click();
};

const openImagePicker = () => {
    imageInput.value.click();
};

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

const visibilities = [
  { label: "Publik", value: "PUBLIC"},
  { label: "Privasi", value: "PRIVATE"}
]

const handleEmojiSelect = (emoji) => {
    console.log('Emoji dipilih:', emoji);
    showEmojiPicker.value = false; 
};

const isFormValid = computed(() => {
  return description.value.trim() !== '' && visibility.value !== '' && community.value !== '';
});

onMounted(() => {
  fetchAccount()
  fetchKomunitas()
});
defineExpose({ openModal });
</script>