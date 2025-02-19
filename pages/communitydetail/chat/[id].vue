<template>
    <div class="container mx-auto p-5 h-screen flex flex-col">
        <!-- Header Komunitas dengan Logo & Button "+" -->
        <div class="bg-blue-700 text-white p-4 text-center font-bold text-lg flex items-center justify-between">
            <div class="flex items-center">
                <img v-if="komunitasImage" :src="komunitasImage" alt="Logo" class="w-10 h-10 rounded-full mr-3">
                <span>{{ komunitasNama || "Loading..." }}</span>
            </div>
            <button @click="toggleForm" class="bg-white text-blue-700 px-3 py-1 rounded-full text-lg shadow-md">+</button>
        </div>

        <!-- Formulir Postingan dalam Bentuk Card Kecil -->
        <div v-if="showForm" class="p-4 border bg-white shadow-md rounded-lg mt-3 max-w-md self-end">
            <textarea v-model="postDescription" placeholder="Deskripsi" class="w-full border p-2 rounded mb-2 text-sm"></textarea>

            <!-- Upload Logo Gambar (hanya menerima gambar) -->
            <input type="file" @change="handleLogoUpload" class="hidden" ref="logoFileInput" accept="image/*">
            <button v-if="!postLogo" @click="triggerLogoUpload" class="bg-gray-200 text-sm p-2 rounded mb-2 w-full">
                Upload Logo Gambar
            </button>
            <div v-else class="flex justify-center mb-2">
                <img :src="postLogo" class="w-16 h-16 rounded-full shadow-md">
            </div>

            <!-- Upload File PDF/JPG dll (hanya menerima PDF, Word, dll) -->
            <input type="file" @change="handleLogoInkUpload" class="hidden" ref="logoInkFileInput" accept=".pdf,.docx,.doc,.pptx,.jpg,.jpeg,.png">
            <button @click="triggerLogoInkUpload" class="bg-gray-200 text-sm p-2 rounded mb-2 w-full">
                Upload File (PDF, Word, JPG, dll)
            </button>
            <div v-if="logoInkFile" class="text-sm text-gray-600 mt-2">
                <span>File: {{ logoInkFile.name }}</span>
            </div>

            <button @click="createPost" class="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm">Bikin Postingan</button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatBox">
            <div v-for="msg in messages" :key="msg.id" class="flex flex-col space-y-2">
                <div v-if="msg.title" class="bg-white p-3 rounded-lg shadow-md border max-w-sm self-start">
                    <p class="font-bold text-sm">{{ msg.username }}</p>
                    <p class="text-gray-700 text-sm">{{ msg.text }}</p>
                    <div v-if="msg.image" class="flex justify-center mt-2">
                        <img :src="msg.image" class="w-24 h-24 rounded-lg shadow-md">
                    </div>
                    <div v-if="msg.logoInkFile" class="mt-2">
                        <a :href="msg.logoInkFile" target="_blank" class="text-blue-600">Lihat File</a>
                    </div>
                </div>
                
                <div v-else class="bg-gray-200 p-3 rounded-lg max-w-xs self-start">
                    <p class="font-bold text-sm">{{ msg.username }}</p>
                    <p v-if="msg.text" class="text-gray-700 text-sm">{{ msg.text }}</p>
                    <div v-if="msg.image" class="flex justify-center mt-2">
                        <img :src="msg.image" class="w-24 h-24 rounded-lg shadow-md">
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 flex items-center border-t gap-2">
            <div class="flex">
                <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                hidden
                ref="docInput"
                @change="handleImageUpload"
              />
              <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" @change="handleImageUpload"  />
              <input
                type="file"
                accept="image/*"
                hidden
                ref="imageInput"
                @change="triggerFileUpload"
              />
              <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
            </div>
            <BaseInputTextArea :rows="1" placeholder="Ketik sesuatu..." @keyup.enter="sendMessage" v-model="newMessage"/>
            <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
            <button @click="sendMessage" class="bg-blue-600 text-white px-4 py-2 rounded ml-2 text-sm">Kirim</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useKomunitas } from "../stores/Komunitas";
import Attachment from "~/components/icons/Attachment.vue";
import Image from "~/components/icons/Image.vue";

const docInput = ref(null) 
const imageInput = ref(null) 
const route = useRoute();
const komunitasStore = useKomunitas();
const komunitasId = ref(route.params.id);
const komunitasNama = ref("");
const komunitasImage = ref("");
const messages = ref([]);
const newMessage = ref("");
const fileInput = ref(null);
const ws = ref(null);
const chatBox = ref(null);

// Variabel untuk postingan baru
const showForm = ref(false);
const postDescription = ref("");
const postLogo = ref(null);
const postFileInput = ref(null);
const logoInkFile = ref(null);

const openImagePicker = () => {
  imageInput.value.click();
};

const openDocPicker = () => {
  docInput.value.click();
};
// Fetch Komunitas Details
const fetchKomunitasDetails = async () => {
    try {
        const communities = await komunitasStore.fetchKomunitas();
        const komunitas = communities.find(k => k.id == komunitasId.value);

        if (komunitas) {
            komunitasNama.value = komunitas.name;
            komunitasImage.value = komunitas.image ? `http://192.168.19.251:8000${komunitas.image}` : null;
        } else {
            komunitasNama.value = "Komunitas Tidak Ditemukan";
            komunitasImage.value = null;
        }
    } catch (error) {
        console.error("Error fetching komunitas:", error);
    }
};

// WebSocket Connection
const setupWebSocket = () => {
    ws.value = new WebSocket(`ws://192.168.19.251:8000/ws/chat/${komunitasId.value}/`);

    ws.value.onopen = () => console.log("WebSocket connected");
    ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        messages.value.push(data);
        scrollToBottom();
    };
    ws.value.onerror = (error) => console.error("WebSocket error:", error);
    ws.value.onclose = () => console.log("WebSocket disconnected");
};

// Toggle Form Postingan
const toggleForm = () => {
    showForm.value = !showForm.value;
};

// Kirim pesan
const sendMessage = () => {
    if (newMessage.value.trim()) {
        const messageData = {
            komunitasId: komunitasId.value,
            username: "Admin",
            text: newMessage.value,
        };

        ws.value.send(JSON.stringify(messageData));
        messages.value.push(messageData);
        newMessage.value = "";
        scrollToBottom();
    }
};

// Kirim Postingan Baru
const createPost = () => {
    if (postDescription.value.trim()) {
        const postData = {
            komunitasId: komunitasId.value,
            username: "Admin",
            text: postDescription.value,
            image: postLogo.value || null,
            logoInkFile: logoInkFile.value ? URL.createObjectURL(logoInkFile.value) : null,
        };

        ws.value.send(JSON.stringify(postData));
        messages.value.push(postData);

        // Reset form
        postDescription.value = "";
        postLogo.value = null;
        logoInkFile.value = null;
        showForm.value = false;

        scrollToBottom();
    }
};

// Scroll ke bawah saat ada pesan baru
const scrollToBottom = () => {
    nextTick(() => {
        chatBox.value.scrollTop = chatBox.value.scrollHeight;
    });
};

// Upload Gambar Chat
const triggerFileUpload = () => fileInput.value.click();
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const messageData = {
                komunitasId: komunitasId.value,
                username: "Admin",
                image: reader.result,
            };
            ws.value.send(JSON.stringify(messageData));
            messages.value.push(messageData);
            scrollToBottom();
        };
        reader.readAsDataURL(file);
    }
};

// Upload Gambar Logo
const triggerLogoUpload = () => document.querySelector('[ref="logoFileInput"]').click();
const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
            postLogo.value = reader.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Hanya gambar yang diperbolehkan.");
    }
};

// Upload File (PDF, Word, dll)
const triggerLogoInkUpload = () => document.querySelector('[ref="logoInkFileInput"]').click();
const handleLogoInkUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/vnd.ms-powerpoint" || file.type.startsWith("image/"))) {
        logoInkFile.value = file;
    } else {
        alert("Hanya PDF, Word, dan PowerPoint yang diperbolehkan.");
    }
};

// Lifecycle Hooks
onMounted(() => {
    fetchKomunitasDetails();
    setupWebSocket();
});
onUnmounted(() => {
    if (ws.value) {
        ws.value.close();
    }
});
</script>
