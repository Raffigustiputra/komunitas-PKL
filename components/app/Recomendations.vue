  <template>
    <div class="mt-2 dark:text-white">
      <div class="flex flex-col gap-3 p-8 rounded-3xl">
        <h3 class="font-bold">Rekomendasi Komunitas</h3>

        <!-- Looping komunitas dari API -->
        <AppCardCommunityCard  
          v-for="community in communityList" 
          :key="community.id"
          :communityName="community.name || 'Nama Komunitas'"
          :description="community.description || ''"
          :iconImage="getCommunityIcon(community.icon)"
          :bannerImage="getCommunityBanner(community.banner)"
          :Category="community.category"
          :isJoined="community.isJoined"
        />

        <!-- Tampilkan pesan jika komunitas kosong atau error -->
        <p v-if="loading" class="text-gray-500">Memuat komunitas...</p>
        <p v-else-if="communityList.length === 0" class="text-gray-500">
          Tidak ada komunitas yang tersedia.
        </p>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-3 px-8 rounded-3xl sticky top-5 dark:text-white">
      <h3 class="font-bold">Taglist Teratas</h3>
      <div class="space-y-4">
        <table class="w-full border-collapse">
          <tbody>
            <tr v-for="(tag, index) in topTags" :key="index" class="border-t">
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
  import { ref, onMounted } from "vue";
  import { useAuth } from "../stores/Auth";

  const defaultCommunityIcon = "/assets/default_user_profile_photo.jpg";
  const defaultCommunityBanner = "/assets/default_banner.jpg";

  const communityList = ref([]);
  const topTags = ref(["taglistone", "taglisttwo", "taglistthree", "taglistfour"]);
  const loading = ref(false);
  const errorMessage = ref("");

  const getCommunityIcon = (icon) => icon ? `http://192.168.19.251:8000${icon}` : defaultCommunityIcon;
  const getCommunityBanner = (banner) => banner ? `http://192.168.19.251:8000${banner}` : defaultCommunityBanner;

  const fetchCommunityData = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const auth = useAuth();
    const [communities, categories, joinedCommunities] = await Promise.all([
      fetch("http://192.168.19.251:8000/api/communities/", {
        headers: {
          Authorization: `Token ${auth.userToken.value}`,
        },
      }).then((res) => res.json()),

      fetch("http://192.168.19.251:8000/api/categories/", {
        headers: {
          Authorization: `Token ${auth.userToken.value}`,
        },
      }).then((res) => res.json()),

      fetch("http://192.168.19.251:8000/api/communities/joined/", {
        headers: {
          Authorization: `Token ${auth.userToken.value}`,
        },
      }).then((res) => res.json()),
    ]);

    communityList.value = communities.map((item) => ({
      id: item.id,
      name: item.name || "Nama Komunitas",
      description: item.description || "",
      icon: item.image,
      banner: item.banner,
      category: categories.find((cat) => cat.id === item.category)?.name || "Tidak ada kategori",
      isJoined: joinedCommunities.some((joined) => joined.id === item.id),
    }));
  } catch (error) {
    console.error("Error fetching community data:", error);
    errorMessage.value = "Gagal memuat komunitas. Silakan coba lagi.";
  } finally {
    loading.value = false;
  }
};


  onMounted(fetchCommunityData);
  </script>
