<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({
    profile_photo: '',
    username: '',
    email: '',
    bio: '',
    location: '',
    website: ''
});

const loading = ref(true);

onMounted(async () => {
    const response = await useAuth().profile();
    user.value = { ...response };
    loading.value = false;
});

const updateProfile = async () => {
    // Simulasi update profil
    console.log('Profil diperbarui:', user.value);
    alert('Profil berhasil diperbarui!');
    router.push('/user-profile');
};
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
            <h2 class="text-2xl font-semibold text-center mb-4">Edit Profil</h2>
            
            <div class="flex flex-col items-center">
                <img v-if="user.profile_photo" :src="user.profile_photo" 
                    alt="Profile Photo" class="w-32 h-32 rounded-full border-4 border-gray-200 shadow-sm mb-4" />
                <input type="file" class="mb-4 text-sm" @change="(e) => user.profile_photo = URL.createObjectURL(e.target.files[0])">
            </div>
            
            <div class="space-y-4">
                <input v-model="user.username" type="text" placeholder="Username" class="w-full p-2 border rounded">
                <input v-model="user.email" type="email" placeholder="Email" class="w-full p-2 border rounded">
                <textarea v-model="user.bio" placeholder="Bio" class="w-full p-2 border rounded"></textarea>
                <input v-model="user.location" type="text" placeholder="Lokasi" class="w-full p-2 border rounded">
                <input v-model="user.website" type="url" placeholder="Website" class="w-full p-2 border rounded">
            </div>
            
            <button @click="updateProfile" 
                class="mt-6 bg-blue-500 text-white py-2 px-4 w-full rounded-lg shadow hover:bg-blue-600 transition">
                Simpan Perubahan
            </button>
        </div>
    </div>
</template>
