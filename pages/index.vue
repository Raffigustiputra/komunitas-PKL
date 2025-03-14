<template>
  <title>Landing Page / KomunitasApp</title>
  <!-- Navbar -->
  <nav class="flex flex-col p-4 md:p-7 bg-white/80 dark:bg-black/50 backdrop-blur shadow sticky top-0 z-10">
    <div class="flex justify-between items-center">
      <div>
        <AppLogo class="text-3xl md:text-4xl" />
      </div>

      
      <!-- Hamburger Button -->
      <Menu @click="toggleSlideMenu" class="cursor-pointer md:hidden dark:text-white" />
      
      <!-- Menu Items -->
      <div class="hidden md:flex gap-3 md:gap-5 items-center">
        <label class="relative flex items-center cursor-pointer ">
            <input type="checkbox" class="sr-only peer" v-model="isDark" />
            <div
              class="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors duration-300 flex items-center px-1"
            >
              <div
                class="w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center shadow-md"
                :class="isDark ? 'translate-x-7' : 'translate-x-0'"
              >
                <svg v-if="!isDark" class="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                <svg v-if="isDark" class="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              </div>
            </div>
          </label>
        <BaseButtonPrimaryButton :onClick="() => navigateTo('/login')" buttonName="Sign In" class="px-4 md:px-5" />
        <BaseButtonTertiaryButton :onClick="() => navigateTo('/register')" buttonName="Sign Up" class="p-2 md:p-3" />
          
      </div>
    </div>
  </nav>
  <div v-if="showSlideMenu" class="fixed inset-0 bg-black/50 z-20" @click="toggleSlideMenu"></div>

    <transition name="slide">
    <div v-if="showSlideMenu" class="fixed inset-0 z-20" @click="toggleSlideMenu">
      <div class="flex flex-col">
        <div class="bg-white dark:bg-gray-800 p-5 shadow-lg" @click.stop>
          <button @click="toggleSlideMenu" class="absolute top-5 right-5 text-xl">✖</button>
          <div class="mt-12 flex flex-col gap-4">
            <BaseButtonPrimaryButton :onClick="() => navigateTo('/login')" buttonName="Sign In" class="px-4 py-2" />
            <BaseButtonTertiaryButton :onClick="() => navigateTo('/register')" buttonName="Sign Up" class="px-4 py-2" />
          </div>
        </div>
      </div>
    </div>
</transition>

  <!-- Hero Section -->
  <div class="flex flex-col md:flex-row items-center justify-evenly mt-20 md:mt-36 px-4 md:px-0">
    <div class="flex flex-col md:items-start items-center text-center md:text-left ">
      <BaseButtonOutlinedButton
        buttonName="The World Most Stunning App."
        class="px-8 md:px-12 text-[#96E2AF] border-[#96E2AF] w-84 md:w-96 mb-5"
      />
      <h1
        class="text-5xl md:text-8xl max-w-[80vh] font-bold bg-gradient-to-r from-[#96E2AF] to-[#3D3BF3] bg-clip-text text-transparent"
      >
        Build Your Community
      </h1>
    </div>
    <div class="flex flex-col items-center md:items-start gap-6 mt-10 md:mt-0 text-center md:text-left">
      <h1 class="text-xl md:text-2xl max-w-[60vh] text-[#ababab]">
        We’ve Created The most useful application for your community, and making it accessible to
        everyone.
      </h1>
      <BaseButtonOutlinedButton
        buttonName="Get Started"
        :onClick="() => navigateTo('/login')"
        class="py-3 md:py-5 px-8 md:px-1 md:w-96"
      />
    </div>
  </div>

  <!-- Features Section -->
  <!-- Features Section -->
<!-- Features Section -->
<div class="flex flex-col md:flex-row justify-center items-start gap-8 mt-20 md:mt-28 p-4 md:p-40 md:text-left text-center">
  <div
    class="bg-gray-100  md:mt-14 rounded-2xl shadow p-6 md:p-10 py-16 md:py-32 w-full hover:shadow-md transition dark:bg-[#1A1625]"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-4">Make Profit</h2>
    <p class="text-gray-500 dark:text-gray-400">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua. Ut enim ad minim
      veniam
    </p>
  </div>

  <div
    class="bg-gray-100 rounded-2xl shadow p-6 md:p-10 py-12 md:py-24 w-full hover:shadow-md transition dark:bg-[#1A1625]"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-4">Build Community</h2>
    <p class="text-gray-500 dark:text-gray-400">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua. Ut enim ad minim
      veniam
    </p>
  </div>

  <div
    class="bg-gray-100 lg:mt-14 md:mt-14 rounded-2xl shadow p-6 md:p-10 py-16 md:py-32 w-full hover:shadow-md transition dark:bg-[#1A1625]"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-4">Make Friends</h2>
    <p class="text-gray-500 dark:text-gray-400">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua. Ut enim ad minim
      veniam
    </p>
  </div>
</div>  

  <!-- Footer -->
  <footer class="bg-[#1A1625] text-white py-10 mt-20 md:mt-32 dark:bg-[#1A1625]">
    <div
      class="flex flex-col md:flex-row justify-between items-center bg-[#F1F1F1]/80 dark:bg-[#1A1625]/75 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-4 md:mx-56 -mt-16 md:-mt-24 shadow-lg"
    >
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] leading-tight">
          Get <br />Started Now!
        </h2>
      </div>
      <button
        @click="navigateTo('/login')"
        class="flex items-center gap-2 border border-[#3D3BF3] text-[#3D3BF3] px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-[#3D3BF3] hover:text-white transition"
      >
        <span>Get Started</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col md:flex-row justify-center md:justify-between items-center mt-12 px-4 md:px-16 flex-wrap gap-6">
      <div class="w-full md:w-auto mb-6 md:mb-0 flex flex-col items-center md:items-start">
        <h3 class="text-lg font-bold mb-4">Location</h3>
        <ul class="space-y-2 text-gray-400">
          <li>Location</li>
          <li>Location</li>
          <li>Location</li>
        </ul>
      </div>

      <div class="w-full md:w-auto mb-6 md:mb-0 flex flex-col items-center md:items-start">
        <h3 class="text-lg font-bold mb-4">Social Media</h3>
        <ul class="space-y-2 text-gray-400">
          <li>Social Media</li>
          <li>Social Media</li>
          <li>Social Media</li>
        </ul>
      </div>

      <div class="w-full md:w-auto mb-6 md:mb-0  flex flex-col items-center md:items-start">
        <h3 class="text-lg font-bold mb-4">Contact Us</h3>
        <ul class="space-y-2 text-gray-400">
          <li>Contact Us</li>
          <li>Contact Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div class="text-4xl font-bold text-[#3D3BF3] w-full md:w-auto text-center md:text-left">
        LOGO
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useThemeStore } from "@/stores/theme";
import { computed } from "vue";
import Menu from "~/components/icons/Menu.vue";

const themeStore = useThemeStore();
const isDark = computed({
  get: () => themeStore.isDarkMode,
  set: (value) => themeStore.toggleDarkMode(),
});

const showSlideMenu = ref(false);
const toggleSlideMenu = () => {
  showSlideMenu.value = !showSlideMenu.value;
};


definePageMeta({
  middleware: "guest",
  layout: "base",
});
</script>

<style>
@media (max-width: 768px) {
  .card {
    width: 100%; /* Card akan memenuhi lebar layar pada layar kecil */
    margin-bottom: 1rem; /* Jarak antar card pada layar kecil */
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
