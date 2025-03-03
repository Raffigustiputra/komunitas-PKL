<template>
  <nav class="w-64 h-screen p-4 flex flex-col fixed">
    <div class="mx-3">
      <AppLogo />
    </div>

    <div class="mt-8 space-y-1">
      <BaseButtonSidebarButton :onClick="() => navigateTo('/homepage')" buttonName="Homepage" :icon="Homepage"
        path="/homepage" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/community-list')" buttonName="Komunitas" :icon="Community"
        path="/community-list" />
      <BaseButtonSidebarButton buttonName="Pencarian" :icon="Search" />
      <BaseButtonSidebarButton buttonName="Bookmark" :icon="Bookmark" />
      <BaseButtonSidebarButton buttonName="Notifikasi" :icon="Notification" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/pengaturan')" path="/pengaturan" buttonName="Pengaturan"
        :icon="Setting" />
      <BaseButtonSidebarButton :onClick="() => useAuth().logout()" buttonName="Logout" :icon="Logout" />
    </div>

    <div class="flex flex-col mt-12 max-w-[30vh]">
      <BaseButtonPrimaryButton buttonName="Posting" :icon="Add" @click="openModal" />
    </div>
    <CreatePostModal ref="modalRef" />
    <div v-if="account" :key="account.id" class="mt-auto flex flex-col gap-4">
      <NuxtLink :to="`/user-profile/`"
        class="flex gap-4 items-center cursor-pointer">
        <BaseLoading :isLoading="loading" />
        <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : ''" />
        <div class="flex flex-col max-w-[20vh]">
          <p class="font-bold">{{ account.username }}</p>
          <p class="text-sm text-gray-500">{{ account.email }}</p>
        </div>
        <div>
          <BaseButtonIconButton :icon="Option" />
        </div>
      </NuxtLink>

    </div>
  </nav>
</template>

<script setup>
import Homepage from "~/components/icons/Homepage.vue";
import Community from "~/components/icons/Community.vue";
import Search from "~/components/icons/Search.vue";
import Bookmark from "~/components/icons/Bookmark.vue";
import Notification from "~/components/icons/Notification.vue";
import Setting from "~/components/icons/Setting.vue";
import Logout from "~/components/icons/Logout.vue";
import Option from "~/components/icons/Option.vue";
import Add from "~/components/icons/Add.vue";
import BaseLoading from "@/components/base/Loading.vue";
import CreatePostModal from "@/components/modal/CreatePostModal.vue";
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

const logId = () => {
  console.log('Navigating to user profile with ID:', account.id);
};
onMounted(() => {
  fetchData();
});
</script>
