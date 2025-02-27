<template>
    <div class="mt-2 dark:text-white">
      <div class="flex flex-col gap-3 p-8 rounded-3xl">
        <div class="bg-white rounded-xl w-full overflow-hidden">
          <div class="bg-gray-200 h-24"></div>
          <div class="px-6 -mt-12 flex items-center gap-4 justify-between">
            <img :src="user.profile_photo ? `http://192.168.19.251:8000${user.profile_photo}` : defaultImage" class="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" alt="Profile Photo" />
            <BaseButtonOutlinedButton buttonName="Edit Profile" @click="goToEditProfile" class="mt-16"/>
          </div>
          <div class="p-7">
            <div class="flex-1">
              <h1 class="text-xl font-semibold">{{ user.username }}</h1>
              <p class="text-gray-500">{{ user.email }}</p>
            </div>
            <p class="text-gray-600 text-sm">{{ user.bio || 'Belum ada bio.' }}</p>
            <p>{{  user.created_at }}</p>
            <div class="mt-4 flex justify-start gap-3 text-sm font-semibold text-gray-700">
              <span>{{ user.followers || 0 }} Pengikut</span>
              <span>{{ user.following || 0 }} Ngikutin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import defaultImage from '/public/assets/default_user_profile_photo.jpg';
  
  const route = useRoute();
  const router = useRouter();
  const user = await useAuth().profile();
  const loading = ref(true);
  
  
  const goToEditProfile = () => {
    router.push('/user-profile/edit-profile');
  };
  </script>
  