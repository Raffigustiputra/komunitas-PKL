<template>
    <title>Komunitas / KomunitasApp</title>
    <div class="flex flex-col gap-5">
        <AppTopbar />
        <AppCommunityList />
        <AppCommunityListButton />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useKomunitas } from "../stores/Komunitas";
import { AppCommunityList } from "#components";

const userData = ref(null);
const router = useRouter();
const komunitasStore = useKomunitas();
const komunitasList = ref([]);

definePageMeta({
    middleware: 'auth',
});

onMounted(() => {
    fetchData();
});
// Fungsi untuk mengambil daftar komunitas
const fetchData = async () => {
    userData.value = useCookie("user");
    try {

        const [communities, categories] = await Promise.all([
            komunitasStore.fetchKomunitas(),
            komunitasStore.CategoryKomunitas(),
        ]);
        console.log(communities);
        komunitasList.value = communities.map((item) => ({
            id: item.id,
            nama_komunitas: item.name,  // Pastikan name disimpan sebagai nama_komunitas
            deskripsi: item.description,
            image: item.image ? `http://192.168.19.251:8000${item.image}` : null,
            member: item.members,
            visibility: item.visibility,
            category: categories.find((cat) => cat.id === item.category)?.name || "Tidak ada kategori",
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


// Fungsi untuk menghapus komunitas
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

// Fungsi untuk Bergabung ke komunitas
const handleJoin = (id) => {
    router.push(`/communitydetail/chat/${id}`);
};

// Fungsi untuk pergi ke detail komunitas
const goToDetail = (id) => {
    router.push('/communitydetail/' + id);
};

</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
