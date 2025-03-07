<template>
  <div class="mt-2 dark:text-white">
    <div class="flex flex-col gap-3 p-8 rounded-3xl">
      <h3 class="font-bold">Rekomendasi Komunitas</h3>
    <AppCardCommunityCard description="lorem ispum dolor sit amet, constrecturer sdajdhasdlasjdklsajdlkasjdklsajdklj" />
    <AppCardCommunityCard />
    <AppCardCommunityCard />
    </div>
</div>
<div class="flex flex-col gap-3 px-8 rounded-3xl sticky top-5 dark:text-white">
  <h3 class="font-bold">Taglist Teratas</h3>
  <div class="space-y-4">
    <table class="w-full border-collapse">
      <tbody>
        <tr v-for="(tag, index) in taglist" :key="index" class="border-t">
          <td class="px-4 py-2 text-gray-600">{{ index + 1 }}.</td>
          <td class="px-4 py-2 text-blue-500 font-medium">#{{ tag }}</td>
          <td class="px-4 py-2 text-blue-500 text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-5 h-5"
            >
              <path
                d="M12 2l2.89 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.11-1.01z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";

const taglist = ref([
  "taglistone",
  "taglistone",
  "taglistone",
  "taglistone",
]);
</script>
