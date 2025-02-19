<template>
    <BaseLoading :isLoading="loading" />
  <div
    class="flex gap-3 bg-white p-5 rounded-3xl dark:bg-[#000000]"
    v-for="(post, index) in postList"
    :key="post.id"
  >
    <div>
      <BaseImageIcon :image="[post.user_profile]" />
    </div>

    <div class="flex flex-col w-full dark:text-white">
      <div class="flex items-center justify-between">
        <div class="flex gap-2 items-center">
          <p class="font-bold">{{ post.user.username }}</p>
          <p class="text-sm text-gray-500">{{ post.user.email }}</p>
          |
          <p class="font-bold">{{ post.community.name }}</p>
        </div>
        <div>
          <p>{{ dayjs(post.created_at).fromNow() }}</p>
        </div>
      </div>
      <p>
        {{ post.description }}
      </p>
      <div class="flex mt-3">
        <BaseImagePost :images="[post.image]" />
      </div>
    </div>
  </div>
  <div v-if="!postList || postList.length === 0" class="flex flex-col items-center text-gray-500">
        Tidak ada Postingan untuk ditampilkan.
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseImagePost from "~/components/base/ImagePost.vue";
import { usePosts } from "~/stores/Posts.js";
import BaseLoading from "@/components/base/Loading.vue";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

definePageMeta({
      middleware: 'auth',
  });

const postStore = usePosts();
const postList = ref([]);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  try {
    const [posts] = await Promise.all([postStore.fetchPosts()]);
    postList.value = posts.map((item) => ({
      id: item.id,
      description: item.description,
      image: item.image
        ? `http://192.168.19.251:8000${item.image}`
        : "",
      attachment: item.attachment
        ? `http://192.168.19.251:8000${item.attachment}`
        : "",
      user: item.user_detail,
      user_profile: item.user_detail.profile_photo ? `http://192.168.19.251:8000${item.user_detail.profile_photo}` : "",
      community: item.community_detail,
      visibility: item.visibility,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// const handleDeleted = async (id) => {
//     try {
//         const success = await komunitasStore.removeKomunitas(id);
//         if (success) {
//             komunitasList.value = komunitasList.value.filter((komunitas) => komunitas.id !== id);
//             alert("Komunitas berhasil dihapus.");
//         }
//     } catch (error) {
//         console.error("Error deleting community:", error);
//         alert("Gagal menghapus komunitas.");
//     }
// };

// const goToDetail = (id) => {
//     router.push(`/communitydetail/chat/${id}`);
// };

onMounted(() => {
  fetchData();
});

</script>
