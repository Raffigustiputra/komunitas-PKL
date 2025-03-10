<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="closeModal">
        <div
            class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">
            <div class="px-5 max-h-[85vh] overflow-y-auto custom-scroll">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-lg dark:text-white">Edit Komunitas</h2>
                    <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
                </div>

                <div class="flex flex-col mb-5 gap-4">
                    <!-- Upload Banner -->
                    <label class="w-full h-40 flex items-center justify-center border border-black bg-[#ECECEC] cursor-pointer relative">
                        <input type="file" class="hidden" id="banner" accept="image/*" @change="handleBannerUpload" />
                        <img :src="bannerUrl" class="w-full h-full object-cover" />
                        <p v-if="!komunitasData.banner">📷 Upload Banner</p>
                        <button v-if="bannerFile" @click.stop="removeBanner" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
                    </label>

                    <!-- Upload Profile Picture -->
                    <label class="w-28 h-28 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer relative">
                        <input type="file" class="hidden" id="image" accept="image/*" @change="handleImageUpload" />
                        <img :src="imageUrl" class="w-full h-full object-cover rounded-full" />
                        <p v-if="!komunitasData.image">📷</p>
                        <button v-if="imageFile" @click.stop="removeImage" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
                    </label>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="name">Nama Komunitas</label>
                        <BaseInput v-model="komunitasData.name" placeholder="Masukkan nama untuk komunitas" />
                    </div>
                    <div>
                        <label for="description">Deskripsi</label>
                        <BaseInput v-model="komunitasData.description" placeholder="Opsional" />
                    </div>
                    <div>
                        <label for="rules">Peraturan</label>
                        <BaseInput v-model="komunitasData.rules" placeholder="Peraturan komunitas" />
                    </div>
                    <div class="flex flex-col gap-3">
                        <BaseDropdownPrimaryDropdown 
                            v-if="categoryItems.length > 0"
                            :items="categoryItems" 
                            v-model="category" 
                            dropdownName="Kategori" 
                        />
                        <BaseDropdownPrimaryDropdown v-model="visibility" :items="visibilities" />
                    </div>
                </div>

                <div class="flex justify-end mt-5 gap-3">
                    <BaseButtonSecondaryButton buttonName="Batal" @click="closeModal" />
                    <BaseButtonPrimaryButton buttonName="Simpan" @click="updateCommunity" />
                </div>
            </div>
        </div>
    </div>
    <BaseAlertPrimaryAlert v-if="alertVisible" :message="alertMessage" :type="alertColor" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useKomunitas } from '~/stores/Komunitas';
import Cancel from '~/components/icons/Cancel.vue';

const komunitasData = ref({
  id: "",
  name: "",
  rules: "",
  description: "",
  image: "",
  banner: "",
});

const isOpen = ref(false);
const imageFile = ref(null);
const bannerFile = ref(null);
const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");

const categoryItems = ref([]);
const category = ref("");
const visibility = ref("PUBLIC");

const komunitasStore = useKomunitas();

// computed tuh biar `imageUrl` dan `bannerUrl` selalu terupdate
const imageUrl = computed(() => {
    return imageFile.value ? URL.createObjectURL(imageFile.value) 
           : komunitasData.value.image ? komunitasData.value.image 
           : "/assets/default_user_profile_photo.jpg";
});

const bannerUrl = computed(() => {
    return bannerFile.value ? URL.createObjectURL(bannerFile.value) 
           : komunitasData.value.banner ? komunitasData.value.banner 
           : "/assets/default_banner.jpg";
});

const openModal = (data) => {
    komunitasData.value = {
        id: data.id || "",
        name: data.name || "",
        rules: data.rules || "",
        description: data.description || "",
        image: data.image || "/assets/default_user_profile_photo.jpg",
        banner: data.banner || "/assets/default_banner.jpg",
    };
    isOpen.value = true;
};

const fetchCategories = async () => {
    try {
        const categoryData = await komunitasStore.CategoryKomunitas();
        if (!categoryData) {
            console.error("Kategori tidak ditemukan!");
            return;
        }
        categoryItems.value = categoryData.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        bannerFile.value = file;
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
    }
};

const removeBanner = () => {
    bannerFile.value = null;
    komunitasData.value.banner = "/assets/default_banner.jpg";
};

const removeImage = () => {
    imageFile.value = null;
    komunitasData.value.image = "/assets/default_user_profile_photo.jpg";
};

const visibilities = [
  { label: "Publik", value: "PUBLIC" },
  { label: "Privasi", value: "PRIVATE" }
];

const updateCommunity = async () => {
    try {
        const updatedData = {
            name: komunitasData.value.name,
            description: komunitasData.value.description,
            rules: komunitasData.value.rules,
            category: category.value,
            visibility: visibility.value,
        };

        // Hanya masukkan image/banner jika ada file baru
        if (imageFile.value) {
            updatedData.image = imageFile.value;
        }
        if (bannerFile.value) {
            updatedData.banner = bannerFile.value;
        }

        await komunitasStore.editKomunitas(komunitasData.value.id, updatedData);
        console.log("Komunitas berhasil diperbarui!");
        window.location.reload();
        closeModal();
    } catch (error) {
        console.error("Gagal memperbarui komunitas:", error);
    }
};


// Tutup Modal
const closeModal = () => {
    isOpen.value = false;
    document.body.style.overflow = "";
};

onMounted(fetchCategories);

defineExpose({ openModal });
</script>
