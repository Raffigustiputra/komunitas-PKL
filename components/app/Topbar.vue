<template>
  <div v-if="useAuth().userToken.value" class="bg-white/80 backdrop-blur-sm dark:bg-black rounded-b-3xl sticky top-0 z-10">
    
    <!-- Navigasi (Blur Effect) -->
    <div class="dark:bg-black/80 rounded-b-3xl">
      <div class="flex justify-center items-center m-4 ">
        <div class="flex items-center gap-6">
          <Menu @click="toggleSlideMenu" class="cursor-pointer md:hidden" />
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
  <div v-if="showSlideMenu" class="fixed left-0 top-0 h-screen z-50  bg-white w-72 shadow-lg p-6 flex flex-col" @click.stop>
    <div class="flex items-center gap-3 mb-4">
      <BaseImageIcon 
        :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : defaultImage" 
        class="w-12 h-12 rounded-full" 
      />
      <div>
        <p class="text-lg font-bold dark:text-white">{{ account.username }}</p>
        <p class="text-sm text-gray-400">{{ account.email }}</p>
      </div>
    </div>
    <hr class="my-4" />
    <div class="flex flex-col items-start gap-8">
      <button @click="navigateTo('/profile')">👤 Profile</button>
      <button @click="navigateTo('/notifikasi')">🔔 Notifikasi</button>
      <button @click="navigateTo('/pengaturan')">⚙ Pengaturan</button>
      <button @click="logout" class="text-red-500">🚪 Logout</button>
    </div>
  </div>
</Transition>

</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "~/stores/Auth.js";
import Menu from "~/components/icons/Menu.vue";
import defaultImage from "/public/assets/default_user_profile_photo.jpg";

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
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
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
