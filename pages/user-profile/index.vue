<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import defaultImage from '/public/assets/default_user_profile_photo.jpg';


const route = useRoute();
const router = useRouter();
const userId = route.params.id;
const user = await useAuth().profile();
const loading = ref(true);


const goToEditProfile = () => {
    router.push('/user-profile/edit-profile');
};
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md h-full flex flex-col items-center">
            <div>
                <BaseImageIcon
                    :image="user.profile_photo ? `http://192.168.19.251:8000${user.profile_photo}` : 'defaultImage'" />
            </div>
            <h1 class="text-2xl font-semibold mt-4">{{ user.username }}</h1>
            <p class="text-gray-500">{{ user.email }}</p>

            <div class="mt-4 p-4 w-full">
                <h2 class="text-lg font-semibold text-gray-700">Bio</h2>
                <p class="text-gray-600 text-sm mt-1">{{ user.bio || 'Belum ada bio.' }}</p>
            </div>

            <div class="mt-4 p-4 w-full">

                <ul class="text-gray-600 text-sm mt-1">

                    <li><strong>Bergabung Sejak:</strong> {{ new Date(user.join_date).toLocaleDateString() }}</li>
                </ul>
            </div>

            <button @click="goToEditProfile"
                class="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                Edit Profil
            </button>
        </div>
    </div>
</template>
