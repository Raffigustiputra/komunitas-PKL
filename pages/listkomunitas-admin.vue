<template>
    <div class="container mx-auto p-5">
        <h1 class="text-3xl font-bold mb-6 text-center">List Komunitas</h1>

        <!-- Tampilkan pesan jika tidak ada komunitas -->
        <div v-if="!komunitasList || komunitasList.length === 0" class="text-center text-gray-500">
            Tidak ada komunitas untuk ditampilkan.
        </div>

        <!-- Daftar Komunitas -->
        <ul v-else class="space-y-4">
            <li v-for="(komunitas, index) in komunitasList" :key="komunitas.id"
                class="flex justify-between items-center bg-white p-4 shadow-md rounded">
                <div class="flex items-start w-full">
                    <!-- Gambar Komunitas -->
                    <div v-if="komunitas.image" class="mr-4">
                        <img :src="komunitas.image" alt="Image" class="w-12 h-12 object-cover rounded-full" />
                    </div>
                    <div class="flex-1">
                        <h2 class="text-xl font-semibold text-[#133E87]">Nama: {{ komunitas.nama_komunitas }}</h2>
                        <p class="text-gray-600">Deskripsi: {{ komunitas.deskripsi }}</p>
                        <p class="text-gray-600">Member: {{ komunitas.member.length  }}</p>
                        <p class="text-sm mt-1">Visibility: {{ komunitas.visibility }}</p>
                        <p v-if="komunitas.category" class="text-sm mt-1">
                            Kategori: {{ komunitas.category }}
                        </p>
                    </div>
                    <!-- {{  useAuth().userData }} -->
                    <!-- {{ komunitas }} ->
                    <!-- {{ komunitas.member.includes(userData.id) }} -->
                    <!-- Tombol Bergabung, Hapus, Detail -->
                    <div class="flex space-x-2">
                        <button @click="handleJoin(komunitas.id)"
                            class="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Bergabung
                        </button>
                        <button @click="handleDeleted(komunitas.id)"
                            class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            v-if="komunitas.member.includes(userData?.value?.id)">
                            Hapus
                        </button>
                        <button @click="goToDetail(komunitas.id)" class="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        v-if="komunitas.member.includes(userData?.value?.id)">
                            Detail Komunitas
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useKomunitas } from "../stores/Komunitas";

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
