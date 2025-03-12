<template>
    <div class="mt-2 dark:text-white">
        <div class="flex flex-col gap-3 p-8 rounded-3xl">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-center my-6">Semua Komunitas</h1>
                <div class="justify-center flex items-center gap-1">
                    <input v-if="isSearching" v-model="searchQuery" type="text" placeholder="Cari komunitas..."
                        class="p-2 border rounded-lg" />
                    <BaseButtonIconButton :icon="Search" @click="toggleSearch" />
                </div>
            </div>

            <!-- Looping komunitas dari API dalam grid 2 kolom -->
            <div class="grid grid-cols-2 gap-4">
                <AppCardCommunityCard v-for="community in filteredCommunities" :key="community.id" class="bg-white dark:bg-black"   
                    :communityName="community.name || 'Nama Komunitas'"
                    :description="community.description || 'Belum ada Deskripsi.'"
                    :iconImage="getCommunityIcon(community.icon)" :bannerImage="getCommunityBanner(community.banner)"
                    :Category="community.category"
                    :Member="community.members_count ? `${community.members_count} Anggota` : '0 Anggota'"
                    @click="goToDetail(community.id)" />
            </div>

            <!-- Tampilkan pesan jika komunitas kosong atau error -->
            <p v-if="loading" class="text-gray-500">Memuat komunitas...</p>
            <p v-else-if="filteredCommunities.length === 0" class="text-gray-500">
                Tidak ada komunitas yang tersedia.
            </p>
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../stores/Auth";
import Search from "~/components/icons/Search.vue";

const router = useRouter();

const defaultCommunityIcon = "/assets/default_user_profile_photo.jpg";
const defaultCommunityBanner = "/assets/default_banner.jpg";

const communityList = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const isSearching = ref(false);
const searchQuery = ref("");

const getCommunityIcon = (icon) => icon ? `http://192.168.19.251:8000${icon}` : defaultCommunityIcon;
const getCommunityBanner = (banner) => banner ? `http://192.168.19.251:8000${banner}` : defaultCommunityBanner;

const fetchCommunityData = async () => {
    loading.value = true;
    errorMessage.value = "";

    try {
        const auth = useAuth();
        const [communities, categories] = await Promise.all([
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
        ]);

        communityList.value = communities.map((item) => ({
            id: item.id,
            name: item.name || "Nama Komunitas",
            description: item.description || "",
            icon: item.image,
            banner: item.banner,
            category: categories.find((cat) => cat.id === item.category)?.name || "Tidak ada kategori",
            member: item.members,
            members_count: item.members_count,
        }));
    } catch (error) {
        console.error("Error fetching community data:", error);
        errorMessage.value = "Gagal memuat komunitas. Silakan coba lagi.";
    } finally {
        loading.value = false;
    }
};

const goToDetail = (id) => {
    router.push(`/communitydetail/${id}`);
};

const toggleSearch = () => {
    isSearching.value = !isSearching.value;
};

const filteredCommunities = computed(() => {
    return communityList.value.filter((community) =>
        community.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(fetchCommunityData);
</script>
