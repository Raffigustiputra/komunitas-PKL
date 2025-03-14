<template>
  <title>Landing Page / KomunitasApp</title>
  <!-- Navbar -->
  <nav
    class="flex flex-col p-4 md:p-7 bg-white/80 dark:bg-black/50 backdrop-blur shadow sticky top-0 z-1"
  >
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <div>
        <AppLogo class="text-3xl md:text-4xl" />
      </div>

      <!-- Hamburger Button (Visible on Mobile) -->
      <button @click="toggleMenu" class="md:hidden p-2 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Menu Items (Hidden on Mobile by Default) -->
      <div
        :class="isMenuOpen ? 'flex' : 'hidden'"
        class="flex-col md:flex-row md:flex gap-3 md:gap-5 items-center mt-4 md:mt-0"
      >
        <!-- Sign In Button -->
        <BaseButtonPrimaryButton
          :onClick="() => navigateTo('/login')"
          buttonName="Sign In"
          class="px-4 md:px-5"
        />

        <!-- Sign Up Button -->
        <BaseButtonTertiaryButton
          buttonName="Sign Up"
          class="p-2 md:p-3"
          :onClick="() => navigateTo('/register')"
        />

        <!-- Dark Mode Toggle -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" v-model="isDark" />
          <div
            class="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors duration-300 flex items-center px-1"
          >
            <div
              class="w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center shadow-md"
              :class="isDark ? 'translate-x-7' : 'translate-x-0'"
            >
              <svg
                v-if="!isDark"
                class="w-4 h-4 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <svg
                v-if="isDark"
                class="w-4 h-4 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
        </label>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <div class="flex flex-col md:flex-row items-center justify-evenly mt-20 md:mt-36 px-4 md:px-0">
    <div class="space-y-5 text-center md:text-left ">
      <BaseButtonOutlinedButton
        buttonName="The World Most Stunning App."
        class="px-8 md:px-12 text-[#96E2AF] border-[#96E2AF]"
      />
      <h1
        class="text-5xl md:text-8xl max-w-[80vh] font-bold bg-gradient-to-r from-[#96E2AF] to-[#3D3BF3] bg-clip-text text-transparent"
      >
        Build Your Community
      </h1>
    </div>
    <div class="space-y-10 mt-10 md:mt-0 text-center md:text-left">
      <h1 class="text-xl md:text-2xl max-w-[60vh] text-[#ababab]">
        We’ve Created The most useful application for your community, and making it accessible to
        everyone.
      </h1>
      <BaseButtonOutlinedButton
        buttonName="Get Started"
        :onClick="() => navigateTo('/login')"
        class="py-3 md:py-5 px-8 md:px-12"
      />
    </div>
  </div>

  <!-- Features Section -->
  <div class="flex flex-col md:flex-row justify-center items-start gap-8 mt-20 md:mt-28 p-4 md:p-40">
    <div
      class="bg-gray-100 mt-14 rounded-2xl shadow p-6 md:p-10 py-16 md:py-32 w-full md:w-80 hover:shadow-md transition dark:bg-[#1A1625]"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-4">Make Profit</h2>
      <p class="text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </div>

    <div
      class="bg-gray-100 rounded-2xl shadow p-6 md:p-10 py-12 md:py-24 w-full md:w-80 hover:shadow-md transition dark:bg-[#1A1625]"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-4">Build Community</h2>
      <p class="text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </div>

    <div
      class="bg-gray-100 mt-14 rounded-2xl shadow p-6 md:p-10 py-16 md:py-32 w-full md:w-80 hover:shadow-md transition dark:bg-[#1A1625]"
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

    <div class="flex flex-col md:flex-row justify-between items-start mt-12 px-4 md:px-16 flex-wrap">
      <div class="w-full md:w-auto mb-6 md:mb-0">
        <h3 class="text-lg font-bold mb-4">Location</h3>
        <ul class="space-y-2 text-gray-400">
          <li>Location</li>
          <li>Location</li>
          <li>Location</li>
        </ul>
      </div>

      <div class="w-full md:w-auto mb-6 md:mb-0">
        <h3 class="text-lg font-bold mb-4">Social Media</h3>
        <ul class="space-y-2 text-gray-400">
          <li>Social Media</li>
          <li>Social Media</li>
          <li>Social Media</li>
        </ul>
      </div>

      <div class="w-full md:w-auto mb-6 md:mb-0">
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

const themeStore = useThemeStore();
const isDark = computed({
  get: () => themeStore.isDarkMode,
  set: (value) => themeStore.toggleDarkMode(),
});

// Hamburger Menu Logic
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

definePageMeta({
  middleware: "guest",
  layout: "base",
});
</script>