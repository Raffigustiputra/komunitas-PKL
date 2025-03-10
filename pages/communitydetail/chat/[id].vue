<template>
  <title>Chat / KomunitasApp</title>
  <div class="container mx-auto p-5 h-screen flex flex-col">
    <div
      class="bg-white rounded-3xl p-4 flex items-center justify-between shadow dark:bg-black dark:text-white"
    >
      <div class="flex items-center gap-2">
        <BaseButtonIconButton
          :icon="Back"
          @click="goBack(komunitasId)"
        />
        <BaseImageIcon
          v-if="komunitasImage"
          :image="komunitasImage"
          class="mr-3 w-10 h-10 rounded-full"
        />
        <span class="text-lg font-bold">{{
          komunitasNama || "Loading..."
        }}</span>
      </div>
    </div>

    <div class="flex-1 p-4 space-y-1 overflow-y-auto">
      <div
        v-for="(chat, index) in chatBox"
        :key="chat.id"
        class="flex flex-col relative"
        :class="chat.user_id === account.id ? 'items-end' : 'items-start'"
        @mouseover="hoveredChat = chat.id"
        @mouseleave="hoveredChat = null"
      >
        <div
          class="flex items-center gap-2"
          :class="chat.user_id === account.id ? 'flex-row' : 'flex-row-reverse'"
        >
        <BaseDropdownIconDropdown
        v-if="hoveredChat === chat.id"
        :icon="Option"
        :dropdownItems="getDropdownItems(chat)"
        class="z-50"
        />
        
        <div
        class="max-w-xs px-4 py-2 rounded-xl shadow"
        :class="
              chat.user_id === account.id
              ? 'bg-[#3D3BF3] text-white'
              : 'bg-white text-gray-900 dark:bg-black dark:text-white'"
          >
          <p class="font-bold">{{ chat.username }}</p>
          <div class="flex items-end gap-3">
              <p>{{ chat.description }}</p>
              <p class="text-sm text-gray-400">
                  {{ formatTime(chat.created_at) }}
                </p>
            </div>
        </div>
        <BaseImageIcon :image="[chat.image]"/>
        </div>
      </div>
    </div>

    <div class="p-4 flex items-center gap-2 bg-white rounded-3xl shadow dark:bg-black dark:text-white">
      <div class="flex gap-2">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          hidden
          ref="docInput"
          @change="handleImageUpload"
        />
        <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" />
        <input
          type="file"
          accept="image/*"
          hidden
          ref="imageInput"
          @change="triggerFileUpload"
        />
        <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
      </div>
      <BaseInputTextArea
        :rows="1"
        placeholder="Ketik sesuatu..."
        v-model="description"
        class="flex-1"
      />
      <BaseButtonIconButton :icon="Send" @click="submitForm" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useKomunitas } from "~/stores/Komunitas.js";
import { useChats } from "~/stores/Chats.js";
import { useAuth } from "~/stores/Auth.js";
import Attachment from "~/components/icons/Attachment.vue";
import Image from "~/components/icons/Image.vue";
import Send from "~/components/icons/Send.vue";
import Back from "~/components/icons/Back.vue";
import Option from "@/components/icons/Option.vue";

const hoveredChat = ref(null);
const docInput = ref(null);
const imageInput = ref(null);
const route = useRoute();
const router = useRouter();
const komunitasStore = useKomunitas();
const komunitasId = ref(route.params.id);
const communityId = route.params.id;
const komunitasNama = ref("");
const komunitasImage = ref("");
const chatStore = useChats();
const chatBox = ref([]);
const description = ref("");
const image = ref(null);
const attachment = ref(null);
const accountStore = useAuth();
const account = ref([]);
const loading = ref(true);

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const openImagePicker = () => {
  imageInput.value.click();
};

const openDocPicker = () => {
  docInput.value.click();
};

const getDropdownItems = (chat) => {
  let items = [{ label: "Laporkan", onClick: () => console.log("Laporkan diklik") }];
  if (chat.user_id === account.value.id) {
    items.push({
      label: "Hapus",
      onClick: () => handleDeleted(chat.id),
    });
  }
  return items;
};

const fetchAccount = async () => {
  loading.value = true;
  try {
    const auth = await accountStore.profile();
    account.value = auth;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

const fetchChats = async (communityId) => {
  try {
    const chats = await chatStore.fetchChatingan(communityId);
    chatBox.value = chats.map((item) => ({
      id: item.id,
      description: item.description,
      user_id: item.user_detail.id,
      username: item.user_detail.username,
      created_at: item.created_at,
      image: item.user_detail.profile_photo ? `http://192.168.19.251:8000${item.user_detail.profile_photo}` : "/assets/default_user_profile_photo.jpg",
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchKomunitasDetails = async () => {
  try {
    const communities = await komunitasStore.fetchKomunitas();
    const komunitas = communities.find((k) => k.id == komunitasId.value);

    if (komunitas) {
      komunitasNama.value = komunitas.name;
      komunitasImage.value = komunitas.image
        ? `http://192.168.19.251:8000${komunitas.image}`
        : null;
    } else {
      komunitasNama.value = "Komunitas Tidak Ditemukan";
      komunitasImage.value = null;
    }
  } catch (error) {
    console.error("Error fetching komunitas:", error);
  }
};

const handleDeleted = async (id) => {
  try {
    const success = await chatStore.removeChat(id);
    if (success) {
      chatBox.value = chatBox.value.filter((chat) => chat.id !== id);
    } 
  } catch (error) {
    console.error("Error deleting post:", error);
  } 
};

const submitForm = async () => {
  try {
    const newChat = await chatStore.createChat(
      description.value,
      attachment.value,
      image.value,
      komunitasId.value,
      account.value.id
    );

    chatBox.value.unshift({
      id: newChat.id,
      description: description.value,
      user_id: account.value.id,
      username: account.value.username,
      attachment: attachment.value,
      image: image.value,
    });

    description.value = "";
    image.value = null;
    attachment.value = null;
  } catch (error) {
    console.log({
      description: description.value,
      image: image.value,
      attachment: attachment.value,
      community: komunitasId.value,
      user: account.value.id,
    });

    console.error("Kenapa ini:", error);
    alert("Gagal membuat chatingan");
  }
};

const goBack = (id) => {
    router.push(`/communitydetail/${id}`);
};

definePageMeta({
  middleware: "auth",
  layout: "community",
});

onMounted(() => {
  fetchKomunitasDetails();
  fetchAccount();
  fetchChats(communityId);
  setInterval(() => fetchChats(communityId), 1000);
});
</script>
