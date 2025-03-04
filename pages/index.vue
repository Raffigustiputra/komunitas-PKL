<template>
  <title>Landing Page / KomunitasApp</title>
  <nav
    class="flex flex-col p-7 bg-white/80 backdrop-blur shadow sticky top-0 z-1"
  >
    <ul class="flex justify-between items-center">
      <div>
        <AppLogo class="text-4xl" />
      </div>
      <div class="flex gap-5 items-center">
        <BaseButtonPrimaryButton
          :onClick="() => navigateTo('/login')"
          buttonName="Sign In"
          class="px-5"
        />
        <BaseButtonTertiaryButton buttonName="Sign Up" class="p-3" />
      </div>
    </ul>
  </nav>

  <div class="flex items-center justify-evenly mt-36">
    <div class="space-y-5">
      <BaseButtonOutlinedButton
        buttonName="The World Most Stunning App."
        class="px-12 text-[#96E2AF] border-[#96E2AF]"
      />
      <h1
        class="text-8xl max-w-[80vh] font-bold bg-gradient-to-r from-[#96E2AF] to-[#3D3BF3] bg-clip-text text-transparent"
      >
        Build Your Community
      </h1>
    </div>
    <div class="space-y-10">
      <h1 class="text-2xl max-w-[60vh] text-[#ababab]">
        We’ve Created The most usefull application for your community, and
        making it accessible to everyone.
      </h1>
      <BaseButtonOutlinedButton
        buttonName="Get Started"
        :onClick="() => navigateTo('/login')"
        class="py-5 px-12"
      />
    </div>
  </div>

  <div class="flex justify-center items-start gap-8 mt-28 p-40">
    <div
      class="bg-gray-100 mt-14 rounded-2xl shadow p-10 py-32 w-80 hover:shadow-md transition"
    >
      <h2 class="text-3xl font-bold text-[#3D3BF3] mb-4">Make Profit</h2>
      <p class="text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    </div>

    <div
      class="bg-gray-100 rounded-2xl shadow p-10 py-24 w-80 hover:shadow-md transition"
    >
      <h2 class="text-3xl font-bold text-[#3D3BF3] mb-4">Build Community</h2>
      <p class="text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    </div>

    <div
      class="bg-gray-100 mt-14 rounded-2xl shadow p-10 py-32 w-80 hover:shadow-md transition"
    >
      <h2 class="text-3xl font-bold text-[#3D3BF3] mb-4">Make Friends</h2>
      <p class="text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        <em>do eiusmod tempor incididunt</em> ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    </div>
  </div>

  <footer class="bg-[#1A1625] text-white py-10 mt-32">
  <div class="flex justify-between items-center bg-[#F1F1F1]/80  backdrop-blur-sm  rounded-xl p-8 mx-56 -mt-24 shadow-lg">
    <div>
      <h2 class="text-3xl font-bold text-[#3D3BF3] leading-tight">
        Get <br />Started Now!
      </h2>
    </div>
    <button @click="navigateTo('/login')" class="flex items-center gap-2 border border-[#3D3BF3] text-[#3D3BF3] px-8 py-3 rounded-full hover:bg-[#3D3BF3] hover:text-white transition">
      <span>Get Started</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>

  <div class="flex justify-between items-start mt-12 px-16 flex-wrap">
    <div>
      <h3 class="text-lg font-bold mb-4">Location</h3>
      <ul class="space-y-2 text-gray-400">
        <li>Location</li>
        <li>Location</li>
        <li>Location</li>
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-bold mb-4">Social Media</h3>
      <ul class="space-y-2 text-gray-400">
        <li>Social Media</li>
        <li>Social Media</li>
        <li>Social Media</li>
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-bold mb-4">Contact Us</h3>
      <ul class="space-y-2 text-gray-400">
        <li>Contact Us</li>
        <li>Contact Us</li>
        <li>Contact Us</li>
      </ul>
    </div>
    <div class="text-4xl font-bold text-[#3D3BF3]">LOGO</div>
  </div>
</footer>

</template>

<script setup>
definePageMeta({
  middleware: "guest",
  layout: "base",
});
</script>
