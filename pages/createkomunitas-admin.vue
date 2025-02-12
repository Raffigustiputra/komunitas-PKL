<template>
    <div class="container mx-auto p-5">
        <h1 class="text-3xl font-bold mb-6 text-center">Create Komunitas</h1>
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
                <label for="image" class="block text-lg font-semibold text-[#133E87]">Tambah Logo</label>
                <input type="file" id="image" accept="image/*" class="mt-2 p-2 w-full border border-[#133E87] rounded"
                    @change="handleImageUpload" />
                <!-- Menampilkan pratinjau gambar -->
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Image preview" class="w-32 h-32 object-cover border rounded" />
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
                    Create Komunitas
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useKomunitas } from '../stores/Komunitas';
import { useRouter } from 'vue-router'; // Import router untuk navigasi


definePageMeta({
    middleware: ['auth']
});

// Inisialisasi store dan router
const komunitasStore = useKomunitas();
const router = useRouter();

// Data binding
const name = ref('');
const description = ref('');
const image = ref(null);
const imagePreview = ref(null);  // Menambahkan variabel untuk pratinjau gambar
const visibility = ref('PUBLIC');
const category = ref('');
const categories = ref([]);

// Validasi form
const isFormValid = computed(() => {
    return (
        name.value.trim() !== '' &&
        description.value.trim() !== '' &&
        category.value !== ''
    );
});

// Fetch kategori komunitas
const fetchCategories = async () => {
    try {
        const categoryData = await komunitasStore.CategoryKomunitas();
        categories.value = categoryData;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Panggil kategori saat komponen dimuat
onMounted(fetchCategories);

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        image.value = file;
        // Menampilkan pratinjau gambar
        imagePreview.value = URL.createObjectURL(file);
    }
}



// Submit form
async function submitForm() {
    console.log('Name:', name.value);
    console.log('Description:', description.value);
    console.log('Category:', category.value);
    console.log('Visibility:', visibility.value);

    try {
        console.log(image.value);

        // Kirim data ke server menggunakan store
        const komunitas = await komunitasStore.CreateKomunitas(
            name.value,
            description.value,
            image.value,
            visibility.value,
            category.value
        );
        console.log('Komunitas created:', komunitas.community.id);

        alert('Komunitas berhasil dibuat.');

        // Reset form setelah sukses
        name.value = '';
        description.value = '';
        image.value = null;
        imagePreview.value = null; // Reset pratinjau gambar
        visibility.value = 'PUBLIC';
        category.value = '';

        // Pindah ke halaman list komunitas
        router.push(`/communitydetail/chat/${komunitas.community.id}`);
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Gagal membuat komunitas. Silakan coba lagi.');
    }
}
</script>
