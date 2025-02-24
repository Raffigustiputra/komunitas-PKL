<template>
    <title> Chat / KomunitasApp</title>
    <div class="container mx-auto p-5 h-screen flex flex-col">
        <div class="bg-white rounded-3xl p-4 text-center font-bold text-lg flex items-center justify-between shadow">
            <div class="flex items-center">
                <BaseButtonIconButton :icon="Back" class="mr-3" @click="navigateTo('/community-list')" />
                <BaseImageIcon v-if="komunitasImage" :image="komunitasImage" class="mr-3" />
                <span>{{ komunitasNama || "Loading..." }}</span>
            </div>
        </div>

        <AppTopbar class="mt-2 mx-14 shadow" />

        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatBox">
            
        </div>

        <div class="p-4 flex items-center gap-2">
            <div class="flex">
                <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                hidden
                ref="docInput"
                @change="handleImageUpload"
              />
              <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" @change="handleImageUpload" v-model="attachment" />
              <input
                type="file"
                accept="image/*"
                hidden
                ref="imageInput"
                @change="triggerFileUpload"
              />
              <BaseButtonIconButton :icon="Image" @click="openImagePicker" v-model="image" />
            </div>
            <BaseInputTextArea :rows="1" placeholder="Ketik sesuatu..." v-model="description"/>
            <BaseButtonIconButton :icon="Send" @click="submitForm" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useKomunitas } from "~/stores/Komunitas.js";
import { useChats } from "~/stores/Chats.js";
import Attachment from "~/components/icons/Attachment.vue";
import Image from "~/components/icons/Image.vue";
import Send from "~/components/icons/Send.vue";
import Back from "~/components/icons/Back.vue";

const docInput = ref(null) 
const imageInput = ref(null) 
const route = useRoute();
const komunitasStore = useKomunitas();
const komunitasId = ref(route.params.id);
const komunitasNama = ref("");
const komunitasImage = ref("");
const chatStore = useChats()
const chatBox = ref(null);
const description = ref('');
const image = ref(null);
const attachment = ref(null);
const accountStore = useAuth();
const account = ref([]);

const openImagePicker = () => {
  imageInput.value.click();
};

const openDocPicker = () => {
  docInput.value.click();
};

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

const submitForm = async () => {
    try{
        await chatStore.createChat(
            description.value,
            attachment.value,
            image.value,
            komunitasId,
            account.value.id,
        )

        description.value = '';
        image.value = null;
        attachment.value = null;
    } catch (error) {
        console.log({
            description: description.value,
            image: image.value,
            attachment: attachment.value,
            community: komunitasId,
            user: account.value.id
        });

        console.error('Kenapa ini:', error);
        alert('Gagal membuat chatingan');
    }
}

onMounted(() => {
    fetchKomunitasDetails();
});
</script>
