<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="closeModal">
        <div
            class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">
            <div class="px-5 max-h-[85vh] overflow-y-auto custom-scroll">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-lg dark:text-white">Edit Profile</h2>
                    <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
                </div>

                <div class="flex flex-col mb-5 gap-4">
                    <!-- Upload Banner -->
                    <label class="w-full h-40 flex items-center justify-center border border-black bg-[#ECECEC] cursor-pointer relative">
                        <input type="file" class="hidden" id="banner" accept="image/*" @change="handleBannerUpload" />
                        <img v-if="bannerUrl" :src="bannerUrl" class="w-full h-full object-cover" />
                        <p v-if="!bannerUrl">📷 Upload Banner</p>
                        <button v-if="bannerUrl" @click.stop="removeBanner" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
                    </label>

                    <!-- Upload Profile Picture -->
                    <label class="w-28 h-28 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer relative">
                        <input type="file" class="hidden" id="image" accept="image/*" @change="handleImageUpload" />
                        <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover rounded-full" />
                        <p v-if="!imageUrl">📷</p>
                        <button v-if="imageUrl" @click.stop="removeImage" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✖</button>
                    </label>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="username">Username</label>
                        <BaseInput v-model="user.username" placeholder="Masukkan username" />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <BaseInput v-model="user.email" placeholder="Masukkan email" />
                    </div>
                    <div>
                        <label for="bio">Bio</label>
                        <BaseInputTextArea v-model="user.bio" placeholder="Tulis bio Anda" />
                    </div>
                </div>

                <div class="flex justify-end mt-5 gap-3">
                    <BaseButtonSecondaryButton buttonName="Batal" @click="closeModal" />
                    <BaseButtonPrimaryButton buttonName="Simpan" @click="updateProfile" />
                </div>
            </div>
        </div>
    </div>
    <BaseAlertPrimaryAlert v-if="alertVisible" :message="alertMessage" :type="alertColor" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../stores/Auth';
import Cancel from '~/components/icons/Cancel.vue';

const user = ref({
    profile_photo: '',
    username: '',
    email: '',
    bio: '',
});

const isOpen = ref(false);
const imageUrl = ref(null);
const bannerUrl = ref(null);
const imageFile = ref(null);
const bannerFile = ref(null);
const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");

const openModal = async () => {
    isOpen.value = true;
    document.body.style.overflow = "hidden";
    const auth = useAuth();
    const response = await auth.profile();
    user.value = { ...response };
    imageUrl.value = user.value.profile_photo 
    ? `http://192.168.19.251:8000${user.value.profile_photo}`
    : "/assets/default_user_profile_photo.jpg";
    bannerUrl.value = user.value.banner 
    ? `http://192.168.19.251:8000${user.value.banner}` 
    : "/assets/default_banner.jpg";
};

const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        bannerFile.value = file;
        bannerUrl.value = URL.createObjectURL(file);
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
        imageUrl.value = URL.createObjectURL(file);
    }
};

const removeBanner = () => {
    bannerFile.value = null;
    bannerUrl.value = null; 
};


const removeImage = () => {
    imageFile.value = null;
    imageUrl.value = null;
};

const closeModal = () => {
    isOpen.value = false;
    document.body.style.overflow = "";
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertColor.value = type;
    alertVisible.value = true;
    setTimeout(() => {
        alertVisible.value = false;
    }, 5000);
};

const updateProfile = async () => {
    try {
        const auth = useAuth();
        const userId = await auth.profile();
        const formData = new FormData();
        formData.append("username", user.value.username);
        formData.append("email", user.value.email);
        formData.append("bio", user.value.bio || "");

        if (imageFile.value) {
            formData.append("profile_photo", imageFile.value);
        }

        // Jika bannerFile ada, tambahkan ke formData
        if (bannerFile.value) {
            formData.append("banner", bannerFile.value);
        } else if (bannerUrl.value === null) {
            // Jika bannerFile tidak ada dan banner dihapus, kirimkan data kosong
            formData.append("banner", "");
        }

        const response = await fetch(`http://192.168.19.251:8000/api/users/detail/${userId.id}/`, {
            method: "PUT",
            headers: { "Authorization": `Token ${auth.userToken.value}` },
            body: formData,
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Gagal memperbarui profil.");

        showAlert("Profil berhasil diperbarui!", "success");
        setTimeout(() => {
            closeModal();
            window.location.reload();
        }, 1000);
    } catch (error) {
        showAlert("Gagal memperbarui profil: " + error.message, "error");
        console.error("Error update profile:", error);
    }
};


onMounted(async () => {
    const response = await useAuth().profile();
    user.value = { ...response };
});

defineExpose({ openModal });
</script>
