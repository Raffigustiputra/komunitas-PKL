<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] shadow-lg flex">

            <div class="relative flex flex-col items-center justify-center w-7 mr-4">
                <div class="absolute w-[2px] h-[50vh] bg-gray-300 dark:bg-gray-600"></div>
            </div>

            <div class="flex-1">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-lg dark:text-white">Edit Profil</h2>
                    <BaseButtonIconButton :icon="Cancel" @click="closeModal" />
                </div>

                <div class="flex flex-col items-start mb-5">
                    <label
                        class="w-32 h-32 flex items-center justify-center border border-black bg-[#ECECEC] rounded-full cursor-pointer">
                        <input type="file" class="hidden" id="image" accept="image/*" @change="handleImageUpload" />
                        <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover rounded-full" />
                        <p v-if="!imageUrl">📷</p>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cancel from '~/components/icons/Cancel.vue';
import { useAuth } from '../stores/Auth';

const router = useRouter();
const user = ref({
    profile_photo: '',
    username: '',
    email: '',
    bio: '',
});

const openModal = () => {
    isOpen.value = true;
    document.body.style.overflow = "hidden";
};

const isOpen = ref(false);
const imageUrl = ref(null);

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageUrl.value = URL.createObjectURL(file);
    }
};

const closeModal = () => {
    isOpen.value = false;
    document.body.style.overflow = "";
};

const updateProfile = async () => {
    console.log('Profil diperbarui:', user.value);
    alert('Profil berhasil diperbarui!');
    closeModal();
    router.push('/user-profile');
};

onMounted(async () => {
    const response = await useAuth().profile();
    user.value = { ...response };
});
defineExpose({ openModal });
</script>
