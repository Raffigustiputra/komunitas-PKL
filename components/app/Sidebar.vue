<template>
  <!-- Sidebar untuk Desktop -->
  <nav class="hidden sm:flex w-64 h-screen px-4 py-6 flex-col fixed">
    <div class="mx-3">
      <AppLogo :onClick="() => navigateTo('/homepage')" buttonName="Homepage" :icon="Homepage" path="/homepage" />
    </div>

    <div class="mt-8 space-y-1">
      <BaseButtonSidebarButton :onClick="() => navigateTo('/homepage')" buttonName="Homepage" :icon="Homepage" path="/homepage" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/community-list')" buttonName="Komunitas" :icon="Community" path="/community-list" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/search')" path="/search" buttonName="Pencarian" :icon="Search" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/bookmark')" path="/bookmark" buttonName="Bookmark" :icon="Bookmark" />
      <BaseButtonSidebarButton buttonName="Notifikasi" :icon="Notification" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/pengaturan')" path="/pengaturan" buttonName="Pengaturan" :icon="Setting" />
      <BaseButtonSidebarButton :onClick="() => useAuth().logout()" buttonName="Logout" :icon="Logout" />
    </div>

    <!-- Tombol Posting -->
    <div class="flex-col mt-10 max-w-full w-90 px-2">
      <BaseButtonPrimaryButton buttonName="Posting" :icon="Add" class="w-full sm:w-auto" @click="openModal" />
    </div>

    <!-- Profile Section -->
    <div v-if="account" :key="account.id" class="mt-auto flex flex-col gap-4">
      <NuxtLink :to="`/user-profile/${account.id}`" class="flex gap-4 items-center cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
        <BaseLoading :isLoading="loading" />
        <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : defaultImage" class="w-12 h-12 rounded-full" />
        <div class="flex flex-col max-w-[20vh]">
          <p class="font-bold dark:text-white text-lg">{{ account.username }}</p>
          <p class="text-sm text-gray-500 truncate">{{ account.email }}</p>
        </div>
      </NuxtLink>
    </div>
  </nav>

  <!-- Navigasi Mobile -->
  <nav class="fixed bottom-0 left-0 right-0 sm:hidden bg-white dark:bg-gray-900 p-3 border-t flex justify-around items-center">
      <button @click="navigateTo('/homepage')" class="flex flex-col items-center">
        <Homepage class="w-8 h-8 text-gray-600 dark:text-white" />
      </button>
      <button @click="navigateTo('/community-list')" class="flex flex-col items-center">
        <Community class="w-8 h-8 text-gray-600 dark:text-white" />
      </button>
      <button @click="openModal" class="flex flex-col items-center bg-blue-500 text-white p-3 rounded-full shadow-lg transform scale-90 sm:scale-100">
        <Add class="w-10 h-10" />
      </button>
      <button @click="navigateTo('/search')" class="flex flex-col items-center">
        <Search class="w-8 h-8 text-gray-600 dark:text-white" />
      </button>
      <button @click="navigateTo(`/user-profile/${account.id}` )" class="flex flex-col items-center">
        <Profile class="w-8 h-8 text-gray-600 dark:text-white" />
      </button>
    </nav>

  <!-- Modal Posting -->
  <CreatePostModal ref="modalRef" />
</template>

<script setup>
import Homepage from "~/components/icons/Homepage.vue";
import Community from "~/components/icons/Community.vue";
import Search from "~/components/icons/Search.vue";
import Bookmark from "../icons/Bookmark.vue";
import Profile from "~/components/icons/Profile.vue";
import Notification from "~/components/icons/Notification.vue";
import Setting from "~/components/icons/Setting.vue";
import Logout from "~/components/icons/Logout.vue";
import Bookmark from "~/components/icons/Bookmark.vue";
import Add from "~/components/icons/Add.vue";

import BaseLoading from "@/components/base/Loading.vue";
import CreatePostModal from "@/components/modal/CreatePostModal.vue";
import defaultImage from "/public/assets/default_user_profile_photo.jpg";
import { ref, onMounted } from "vue";
import { useAuth } from "~/stores/Auth.js";

const modalRef = ref(null);
const openModal = () => {
  modalRef.value.openModal();
};

const accountStore = useAuth();
const account = ref([]);
const loading = ref(true);

const fetchData = async () => {
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

onMounted(() => {
  fetchData();
});
</script>
