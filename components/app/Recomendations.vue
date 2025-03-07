<template>
  <div class="mt-2 dark:text-white">
    <!-- Rekomendasi Komunitas -->
    <div class="flex flex-col gap-3 p-8 rounded-3xl">
      <h3 class="font-bold text-lg">Rekomendasi Komunitas</h3>

      <!-- Looping komunitas dari API -->
      <AppCardCommunityCard
        v-for="kom in komunitas"
        :key="kom.id"
        :communityName="kom.name"
        :description="kom.description"
        :iconImage="kom.icon || defaultImage"
        :bannerImage="kom.banner || defaultBanner"
        :headerClick="() => goToCommunity(kom.id)"
        :categoryClick="() => filterByCategory(kom.category)"
        :buttonClick="() => joinCommunity(kom.id)"
      />

      <!-- Tampilkan pesan jika komunitas kosong -->
      <p v-if="komunitas.length === 0" class="text-gray-500">
        Tidak ada komunitas yang tersedia.
      </p>
    </div>
  </div>

  <!-- Taglist Teratas -->
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
                <path d="M12 2l2.89 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.11-1.01z" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import defaultImage from "/public/assets/default_user_profile_photo.jpg";
import defaultBanner from "/public/assets/default_banner.jpg";

const komunitas = ref([]);
const taglist = ref(["taglistone", "taglistone", "taglistone", "taglistone"]);

async function fetchKomunitas() {
  try {
    const response = await fetch("http://192.168.19.251:8000/api/communities/", {
      headers: {
        Authorization: `Token ${useAuth().userToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil komunitas. Status: ${response.status}`);
    }

    komunitas.value = await response.json();
  } catch (err) {
    console.error("Error fetching communities:", err);
  }
}

// Fungsi Event Click
function goToCommunity(id) {
  console.log(`Navigasi ke komunitas dengan ID: ${id}`);
}

function filterByCategory(category) {
  console.log(`Filter komunitas berdasarkan kategori: ${category}`);
}

function joinCommunity(id) {
  console.log(`Gabung ke komunitas dengan ID: ${id}`);
}

// Panggil API saat komponen dimuat
onMounted(fetchKomunitas);
</script>
