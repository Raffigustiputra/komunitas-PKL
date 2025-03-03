<template>
  <div class="mt-2 dark:text-white">
    <div class="flex flex-col gap-3 p-8 rounded-3xl">
      <div class="bg-white rounded-xl w-full overflow-hidden">
        <div class="bg-gray-200 h-24"></div>
        <div class="px-6 -mt-12 flex items-center gap-4 justify-between">
          <img :src="user.profile_photo ? `http://192.168.19.251:8000${user.profile_photo}` : defaultImage"
            class="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" alt="Profile Photo" />
          <BaseButtonOutlinedButton buttonName="Edit Profile" @click="goToEditProfile" class="mt-16" />
        </div>
        <div class="p-7">
          <div class="flex-1">
            <h1 class="text-xl font-semibold">{{ user.username }}</h1>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
          <p class="text-gray-600 text-sm">{{ user.bio || 'Belum ada bio.' }}</p>
          <p>{{ user.created_at }}</p>
          <div class="mt-4 flex justify-start gap-3 text-sm font-semibold text-gray-700">
            <span>{{ user.followers || 0 }} Pengikut</span>
            <span>{{ user.following || 0 }} Ngikutin</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-10">
      <SecondaryButton buttonName="Postingan" @click="activeTab = 'postingan'" />
      <SecondaryButton buttonName="Balasan" @click="activeTab = 'balasan'" />
      <SecondaryButton buttonName="Komunitas" @click="activeTab = 'komunitas'" />
    </div>

    <!-- Daftar Postingan User -->
    <div v-if="activeTab === 'postingan'" class="mt-4 p-4 bg-white rounded-xl shadow">
      <h2 class="text-lg font-semibold">Postingan Saya</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="userPosts.length === 0">Belum ada postingan.</div>
      <ul v-else>
        <li v-for="post in userPosts" :key="post.id" class="border-b p-4">
          <h3 class="font-semibold">{{ post.description }}</h3>
          <img v-if="post.image" :src="`http://192.168.19.251:8000${post.image}`" class="w-full h-40 object-cover mt-2 rounded-lg" />
        </li>
      </ul>
    </div>
    <ul v-if="useAuth().userToken.value">
      <li class="flex gap-3 bg-white p-5 rounded-3xl dark:bg-[#000000]" v-for="(post, index) in postList" :key="post.id">
        <div class="space-y-2">
          <BaseCommunityIcon :image="[post.community_image]" />
          <BaseImageIcon :image="[post.user_profile]" />
        </div>

        <div class="flex flex-col w-full dark:text-white" v-if="activeTab === 'balasan'">
          <div class="flex justify-between">
            <div class="flex flex-col items-start">
              <div class="flex gap-3">
                <p class="font-bold">{{ post.community.name }}</p>
                <BaseButtonSecondaryButton buttonName="Gabung" v-if="!isUserJoined(post.community.id)" @click="openModal(post.community.id)" />
              </div>
              <p class="text-sm">Dikirim oleh <span class="font-bold"> {{ post.user.username }}</span></p>
            </div>
            <div>
              <p>{{ dayjs(post.created_at).fromNow() }}</p>
            </div>
          </div>
          <p class="mt-2">
            {{ post.description }}
          </p>
          <div v-if="post.image" class="flex my-3">
            <BaseImagePost :images="[post.image]" />
          </div>
          <div v-if="post.attachment">
            <BaseFilePreview :documents="[post.attachment]" />
          </div>
          <div class="flex items-end justify-end">
            <BaseDropdownIconDropdown
              :icon="Option"
              :dropdownItems="getDropdownItems(post)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { usePosts } from '@/stores/Posts';
import defaultImage from '/public/assets/default_user_profile_photo.jpg';
import SecondaryButton from '~/components/base/button/SecondaryButton.vue';

const route = useRoute();
const router = useRouter();
const postsStore = usePosts();

const user = await useAuth().profile();
const userPosts = ref([]);
const loading = ref(true);
const activeTab = ref('postingan');

const fetchUserPosts = async () => {
  try {
    userPosts.value = await postsStore.fetchUserPosts();
  } catch (error) {
    console.error("Gagal mengambil postingan user:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserPosts);

const goToEditProfile = () => {
  router.push('/user-profile/edit-profile');
};
</script>
