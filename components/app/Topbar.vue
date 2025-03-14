<template>
  <div v-if="useAuth().userToken.value"
    class="bg-white/80 backdrop-blur-sm dark:bg-black/75 rounded-b-3xl sticky top-0 z-10">

    <!-- Navigasi (Blur Effect) -->
    <div class="rounded-b-3xl">
      <div class="flex justify-center items-center m-4 ">
        <div class="flex items-center gap-6">
          <Menu @click="toggleSlideMenu" class="cursor-pointer md:hidden dark:text-white" />
          <div class="flex gap-4">
            <BaseButtonTopbarButton :onClick="() => navigateTo('/homepage')" path="/homepage" buttonName="For You" />
            <BaseButtonTopbarButton buttonName="Komunitas" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Slide Menu (Hanya Muncul di Mobile, Tanpa Blur) -->
  <!-- Background hitam tetap muncul tanpa transisi -->
  <div v-if="showSlideMenu" class="fixed inset-0 bg-black/50 md:hidden z-40" @click="toggleSlideMenu"></div>
  <Transition name="slide">
    <div v-if="showSlideMenu" class="fixed left-0 top-0 h-screen z-50  bg-white w-72 dark:bg-black shadow-lg p-6 flex flex-col"
      @click.stop>
      <div class="flex items-center gap-3 mb-4">
        <NuxtLink :to="`/user-profile/${account.id}`"
          class="flex gap-4 items-center cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <BaseLoading :isLoading="loading" />
          <BaseImageIcon
            :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : defaultImage"
            class="w-12 h-12 rounded-full" />
          <div class="flex flex-col max-w-[20vh]">
            <p class="font-bold dark:text-white text-lg">{{ account.username }}</p>
            <p class="text-sm text-gray-500 truncate">{{ account.email }}</p>
          </div>
        </NuxtLink>
      </div>
      <hr class="my-4" />
      <div class="flex flex-col items-start gap-4 h-full">
  <div class="flex flex-col items-start gap-4">
    <BaseButtonSidebarButton :onClick="() => navigateTo(`/user-profile/${account.id}`)" path="/profile" buttonName="Profile"
      :icon="Profile" class="flex items-center gap-2 dark:text-white" />
    <BaseButtonSidebarButton :onClick="() => navigateTo('/notifikasi')" path="/notifikasi" buttonName="Notifikasi"
      :icon="Notification" class="flex items-center gap-2 dark:text-white" />
    <BaseButtonSidebarButton :onClick="() => navigateTo('/bookmark')" path="/bookmark" buttonName="Bookmark"
      :icon="Bookmark" class="flex items-center gap-2 dark:text-white" />
    <BaseButtonSidebarButton :onClick="() => navigateTo('/pengaturan')" path="/pengaturan" buttonName="Pengaturan"
      :icon="Setting" class="flex items-center gap-2 dark:text-white" />
  </div>
  
  <div class="mt-auto w-full">
    <BaseButtonSidebarButton :onClick="logout" buttonName="Logout" :icon="Logout"
      class="text-red-500 flex items-center gap-2 dark:text-red-400" />
  </div>
</div>

    </div>
  </Transition>

</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "~/stores/Auth.js";
import Menu from "~/components/icons/Menu.vue";
import defaultImage from "/public/assets/default_user_profile_photo.jpg";
import Setting from "../icons/Setting.vue";
import Notification from "../icons/Notification.vue";
import Profile from "../icons/Profile.vue";
import Logout from "../icons/Logout.vue";
import Bookmark from "../icons/Bookmark.vue";

const showSlideMenu = ref(false);
const account = ref({});
const accountStore = useAuth();

const toggleSlideMenu = () => {
  showSlideMenu.value = !showSlideMenu.value;
};

const logout = () => {
  useAuth().logout();
  showSlideMenu.value = false;
};

const fetchData = async () => {
  try {
    const auth = await accountStore.profile();
    account.value = auth;
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style>
/* Animasi slide */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Styling Menu */
/* .menu-item {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: background 0.2s;
  color: black;
}
.menu-item:hover {
  background: rgba(0, 0, 0, 0.1);
}
.dark .menu-item {
  color: white;
}
.dark .menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
} */
</style>
