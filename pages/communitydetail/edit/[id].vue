<template>
    <div class="container mx-auto p-5" v-if="!loading">
        <div class="flex justify-end mb-4">
            <button @click="router.push(`/communitydetail/${komunitasId}`)"
                class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                ← Back to Detail
            </button>
        </div>

        <h1 class="text-3xl font-bold mb-6 text-center">Edit Komunitas</h1>
        <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Input Nama Komunitas -->
            <div>
                <label for="name" class="block text-lg font-semibold text-[#133E87]">Nama Komunitas</label>
                <input v-model="name" type="text" id="name" class="mt-2 p-2 w-full border border-[#133E87] rounded"
                    placeholder="Masukkan Nama Komunitas" />
            </div>

            <!-- Input Deskripsi -->
            <div>
                <label for="description" class="block text-lg font-semibold text-[#133E87]">Deskripsi</label>
                <textarea v-model="description" id="description" class="mt-2 p-2 w-full border border-[#133E87] rounded"
                    placeholder="Masukkan deskripsi Komunitas"></textarea>
            </div>

            <!-- Input Gambar -->
            <div>
                <label for="image" class="block text-lg font-semibold text-[#133E87]">Upload Gambar</label>
                <input required  type="file" id="image" accept="image/*" class="mt-2 p-2 w-full border border-[#133E87] rounded"
                    @change="handleImageUpload" />
                <!-- Menampilkan pratinjau gambar -->
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Image preview" class="w-32 h-32 object-cover border rounded mb-2" />
                    <button type="button" @click="removeImage" class="bg-red-500 text-white py-1 px-3 rounded text-sm">
                        Hapus Logo
                    </button>
                </div>
            </div>

            <!-- Input Visibility -->
            <div>
                <label for="visibility" class="block text-lg font-semibold text-[#133E87]">Visibility</label>
                <select v-model="visibility" id="visibility" class="mt-2 p-2 w-full border border-[#133E87] rounded">
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                </select>
            </div>

            <!-- Input Kategori -->
            <div>
                <label for="category" class="block text-lg font-semibold text-[#133E87]">Category</label>
                <select v-model="category" id="category" class="mt-2 p-2 w-full border border-[#133E87] rounded">
                    <option value="" disabled>Pilih Kategori</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <div>
                <button type="submit" class="bg-[#133E87] text-white py-2 px-4 rounded mt-4 w-full transition"
                    :disabled="!isFormValid">
                    Update Komunitas
                </button>
            </div>
        </form>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center mt-10">
        <div class="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useKomunitas } from '../stores/Komunitas';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const komunitasStore = useKomunitas();

const name = ref('');
const description = ref('');
const image = ref(null);
const imagePreview = ref(null);
const visibility = ref('PUBLIC');
const category = ref('');
const categories = ref([]);
const komunitasId = route.params.id;
const loading = ref(true);
const imageToRemove = ref(false); // Flag untuk menandai penghapusan gambar

// Fetch kategori komunitas
const fetchCategories = async () => {
    try {
        const categoryData = await komunitasStore.CategoryKomunitas();
        categories.value = categoryData;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Fetch data komunitas yang ingin diedit
const fetchKomunitasData = async () => {
    try {
        const response = await komunitasStore.fetchKomunitasDetail(komunitasId);
        name.value = response.nama_komunitas;
        console.log(response.name);
        description.value = response.deskripsi;
        console.log(response.description);
        visibility.value = response.visibility;
        console.log(response.visibility);
        category.value = response.category_id;
        console.log(response.category_id);
        imagePreview.value = response.image ? `${response.image}` : null;
        console.log(imagePreview.value);
    } catch (error) {
        console.error('Error fetching community data:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCategories();
    fetchKomunitasData();
});

const isFormValid = computed(() => {
    return (
        name.value?.trim() !== '' &&
        description.value?.trim() !== '' &&
        category.value !== ''
    );
});

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        image.value = file;
        imagePreview.value = URL.createObjectURL(file);
        imageToRemove.value = false; // Batalkan penghapusan jika gambar baru diunggah
    }
}

// Fungsi untuk menghapus gambar
function removeImage() {
    image.value = null;
    imagePreview.value = null;
    imageToRemove.value = true; // Tandai bahwa gambar akan dihapus
}

// Submit form
async function submitForm() {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('visibility', visibility.value);
    formData.append('category', category.value);

    // Tambahkan gambar jika ada
    if (image.value) {
        formData.append('image', image.value);
    }

    // Jika gambar dihapus, tambahkan flag untuk menghapus gambar di server
    if (imageToRemove.value) {
        try {
            // Memanggil fungsi removeImage di store untuk menghapus gambar di server
            await komunitasStore.removeImage(komunitasId);
        } catch (error) {
            console.error('Error deleting image from server:', error);
            alert('Gagal menghapus gambar.');
            return;
        }
    }

    try {
        await komunitasStore.editKomunitas(komunitasId, formData);
        alert('Komunitas berhasil diperbarui.');
        router.push('/listkomunitas-admin');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Gagal memperbarui komunitas. Silakan coba lagi.');
    }
}
</script>

<style scoped>
/* Add styles here */
</style>
