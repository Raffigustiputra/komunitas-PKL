<template>
  <div class="flex gap-3 bg-white p-5 rounded-3xl">
    <div>
      <BaseImageIcon />
    </div>

    <div class="flex flex-col w-full gap-3">
        <div class="flex items-center justify-between">
            <div class="flex gap-2 items-center">
              <p class="font-bold">User 1</p>
              <p class="text-sm">@user1</p>
              |
              <p class="font-bold">Komunitas 1</p>
            </div>
            <div>
                <p>5 menit yang lalu</p>
            </div>
        </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <BaseImagePost :images="Images" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseImagePost from "~/components/base/ImagePost.vue";

const Images = ref([
  "https://placehold.co/400x400", 
  "https://placehold.co/400x400", 
  "https://placehold.co/200x400", 
  "https://placehold.co/400x400", 
]);
</script>
