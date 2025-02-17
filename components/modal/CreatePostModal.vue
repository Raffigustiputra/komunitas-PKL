<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
            class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[350px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">

            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-lg dark:text-white">Buat Postingan</h2>
                <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
            </div>

            <div class="flex items-center mb-4 gap-2">
                <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <BaseDropdownPrimaryDropdown v-model="selectedVisibility" />
                <BaseDropdownPrimaryDropdown dropdownName="Komunitas" />
            </div>

            <div class="flex flex-col mb-4">
                <textarea v-model="postContent" placeholder="Apa yang sedang terjadi??"
                    class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none dark:bg-[#1A1A1A] dark:text-white"
                    rows="4"></textarea>
            </div>

            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span class="mr-2">🌐</span> <span>Semua bisa berkomentar</span>
            </div>

            <div class="flex gap-3 mb-4">
                <input type="file" accept=".pdf,.doc,.docx,.txt" hidden ref="docInput" @change="handleFileSelect" />
                <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" class="text-[#3D3BF3]" />
                <input type="file" accept="image/*" hidden ref="imageInput" @change="handleFileSelect" />
                <BaseButtonIconButton :icon="Image" @click="openImagePicker" class="text-[#3D3BF3]" />
                <BaseButtonIconButton :icon="Emot" @click="showEmojiPicker = !showEmojiPicker" class="text-[#3D3BF3]" />
                <EmojiPicker v-if="showEmojiPicker" @select="handleEmojiSelect" />
            </div>

            <div class="flex justify-end gap-3">
                <BaseButtonSecondaryButton buttonName="Draft" @click="saveDraft" />
                <BaseButtonPrimaryButton buttonName="Buat" @click="createPost" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Cancel from '~/components/icons/Cancel.vue';
import Attachment from '~/components/icons/Attachment.vue';
import Image from "~/components/icons/Image.vue";
import Emot from "~/components/icons/Emot.vue";
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const isOpen = ref(false);
const postContent = ref('');
const fileInput = ref(null);
const imageInput = ref(null);
const docInput = ref(null);
const showEmojiPicker = ref(false);


const openModal = () => { isOpen.value = true; };
const closeModal = () => { isOpen.value = false; };

const saveDraft = () => {
    console.log('Draft saved:', postContent.value);
};

const createPost = () => {
    console.log('Post created:', postContent.value);
    closeModal();
};

const openDocPicker = () => {
    docInput.value.click();
};

const openImagePicker = () => {
    imageInput.value.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("Selected file:", file);
    }
};

const handleEmojiSelect = (emoji) => {
    console.log('Emoji dipilih:', emoji);
    showEmojiPicker.value = false; // Tutup picker setelah memilih emoji
};
defineExpose({ openModal });
</script>