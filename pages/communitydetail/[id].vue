<template>
    <div class="container mx-auto p-5">
        <div class="flex justify-end mb-4">
            <button @click="navigateTo('/listkomunitas-admin')"
                class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                ← Back to List
            </button>
        </div>
        <h1 class="text-3xl font-bold mb-6 text-center">Detail Komunitas</h1>

        <div v-if="loading" class="text-center text-gray-500">
            Memuat data...
        </div>

        <div v-if="error" class="text-center text-red-500">
            {{ error }}
        </div>

        <div v-if="komunitas" class="bg-white p-4 shadow-md rounded">
            <div class="flex items-start">
                <div v-if="komunitas.image" class="mr-4">
                    <img :src="komunitas.image" alt="Image" class="w-12 h-12 object-cover rounded-full" />
                </div>
                <div class="flex-1">
                    <h2 class="text-xl font-semibold text-[#133E87]">Nama: {{ komunitas.nama_komunitas }}</h2>
                    <p class="text-gray-600">Deskripsi: {{ komunitas.deskripsi }}</p>
                    <p class="text-sm mt-1">Visibility: {{ komunitas.visibility }}</p>
                    <p v-if="komunitas.category" class="text-sm mt-1">
                        Kategori: {{ komunitas.category }}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <button @click="navigateTo('/communitydetail/edit/' + komunitas.id)"
                        class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useKomunitas } from "../stores/Komunitas";

const router = useRouter();
const komunitasStore = useKomunitas();
const komunitas = ref(null);
const loading = ref(true);
const error = ref(null);

// Ambil ID dari parameter route
const komunitasId = router.currentRoute.value.params.id;
console.log(komunitasId);

const fetchKomunitasDetail = async () => {
    loading.value = true;
    error.value = null;

    try {
        await nextTick()
        const response = await komunitasStore.fetchKomunitasDetail(komunitasId);
        komunitas.value = response;
        if (response) {
            komunitas.value = {
                id: response.id,
                nama_komunitas: response.nama_komunitas,
                deskripsi: response.deskripsi,
                image: response.image ? `${response.image}` : null,
                member: response.members ? `${response.members}` : null,
                visibility: response.visibility,
                category: response.category ? response.category.name : "Tidak ada kategori",

            };
            console.log(komunitas.value);

        } loading.value = false;
    } catch (err) {
        error.value = "Gagal mengambil detail komunitas.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// Ambil data saat komponen dimuat
onMounted(fetchKomunitasDetail);
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
