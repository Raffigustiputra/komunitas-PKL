<template>
    <BaseLoading :isLoading="loading" />
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-center my-6 text-black dark:text-white">
            List Komunitas
        </h1>
        <div class="justify-center flex items-center gap-1">
            <input v-if="isSearching" v-model="searchQuery" type="text" placeholder="Cari komunitas..."
                class="p-2 border rounded-lg" />
            <BaseButtonIconButton :icon="Search" @click="toggleSearch" />

            <BaseButtonIconButton :icon="Option" />
        </div>
    </div>


    <div class="flex flex-col bg-white rounded-3xl px-5 py-3 hover:shadow-md hover:cursor-pointer shadow-sm "
        v-for="(komunitas, index) in filteredKomunitas" :key="komunitas.id" @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null">
        <div class="flex items-center gap-3 justify-between">
            <div @click="goToDetail(komunitas.id)" class="flex items-center gap-4">
                <BaseImageIcon :image="komunitas.image" />
                <p class="font-bold">{{ komunitas.nama_komunitas }}</p>
            </div>
            <div class="flex gap-3" v-if="hoveredIndex === index">
                <BaseButtonDeleteButton :icon="Trash" @click="handleDeleted(komunitas.id)"
                    v-if="komunitas.member.includes(userData?.value?.id)" />
                <BaseButtonEditButton :icon="Pencil" @click="handleEdit(komunitas.id)"
                    v-if="komunitas.member.includes(userData?.value?.id)" />
            </div>
        </div>
    </div>
    <div v-if="filteredKomunitas.length === 0" class="text-center text-gray-500">
        Tidak ada komunitas untuk ditampilkan.
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useKomunitas } from "~/stores/Komunitas";
import BaseLoading from "@/components/base/Loading.vue";
import Trash from '~/components/icons/Trash.vue';
import Pencil from '~/components/icons/Pencil.vue';
import Search from '~/components/icons/Search.vue';
import Option from '~/components/icons/Option.vue';

const loading = ref(true);
const userData = ref(null);
const router = useRouter();
const komunitasStore = useKomunitas();
const komunitasList = ref([]);
const hoveredIndex = ref(null);
const isSearching = ref(false);
const searchQuery = ref("");

definePageMeta({
    middleware: 'auth',
});

onMounted(() => {
    fetchData();
});

const fetchData = async () => {
    loading.value = true;
    userData.value = useCookie("user");
    try {
        const communities = await komunitasStore.fetchJoinedKomunitas();
        komunitasList.value = communities.map((item) => ({
            id: item.id,
            nama_komunitas: item.name,
            deskripsi: item.description,
            image: item.image ? `http://192.168.19.251:8000${item.image}` : "https://placehold.co/400x400",
            member: item.members,
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading.value = false;
    }
};

const toggleSearch = () => {
    isSearching.value = !isSearching.value;
};

const filteredKomunitas = computed(() => {
    return komunitasList.value.filter((komunitas) =>
        komunitas.nama_komunitas.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const handleDeleted = async (id) => {
    try {
        const success = await komunitasStore.removeKomunitas(id);
        if (success) {
            komunitasList.value = komunitasList.value.filter((komunitas) => komunitas.id !== id);
            alert("Komunitas berhasil dihapus.");
        }
    } catch (error) {
        console.error("Error deleting community:", error);
        alert("Gagal menghapus komunitas.");
    }
};

const goToDetail = (id) => {
    router.push(`/communitydetail/${id}`);
};
</script>
