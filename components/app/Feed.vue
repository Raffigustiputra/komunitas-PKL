<template>
  <div
    class="flex gap-3 bg-white p-5 rounded-3xl dark:bg-[#000000]"
    v-for="(post, index) in postList"
    :key="post.id"
    v-if="useAuth().userToken.value"
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
      <div v-if="post.image" class="flex my-3">
        <BaseImagePost :images="[post.image]" />
      </div>
      <div v-if="post.attachment">
        <BaseFilePreview :documents="[post.attachment]" />
      </div>
      <div class="flex items-end justify-end">
        <BaseDropdownIconDropdown
          :icon="Option"
          :dropdownItems="[
            { label: 'Laporkan', onClick: () => console.log('Profile clicked') },
            {
              label: 'Hapus',
              onClick: () => handleDeleted(post.id),
            }
          ]"
        />
      </div>
    </div>
    <div
      v-if="!postList || postList.length === 0"
      class="flex flex-col items-center text-gray-500"
    >
      Tidak ada Postingan untuk ditampilkan.
    </div>
    <BaseLoading :isLoading="loading" />
  </div>
     <BaseAlertPrimaryAlert
        v-if="alertVisible"
        :message="alertMessage"
        :type="alertColor"
      />
</template>

<script setup>
import { ref } from "vue";
import BaseImagePost from "~/components/base/ImagePost.vue";
import { usePosts } from "~/stores/Posts.js";
import BaseLoading from "@/components/base/Loading.vue";
import Option from "@/components/icons/Option.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");
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
      image: item.image ? `http://192.168.19.251:8000${item.image}` : "",
      attachment: item.attachment
        ? `http://192.168.19.251:8000${item.attachment}`
        : "",
      user: item.user_detail,
      user_profile: item.user_detail.profile_photo
        ? `http://192.168.19.251:8000${item.user_detail.profile_photo}`
        : "",
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

const handleDeleted = async (id) => {
    try {
        const success = await postStore.removePost(id);
        if (success) {
            postList.value = postList.value.filter((post) => post.id !== id);
            alertMessage.value = "Berhasil menghapus Postingan.";
            alertColor.value = "success";  
            alertVisible.value = true;
        } else {
            alertMessage.value = "Gagal menghapus Postingan.";
            alertColor.value = "error";
            alertVisible.value = true;
        }
    } catch (error) {
        console.error("Error deleting Post:", type);
        alertMessage.value = "Terjadi kesalahan saat menghapus.";
        alertColor.value = type;
        alertVisible.value = true;
    } finally {
        // Sembunyikan alert setelah 3 detik
        setTimeout(() => {
            alertVisible.value = false;
        }, 3000);
    }
};


// const goToDetail = (id) => {
//     router.push(`/communitydetail/chat/${id}`);
// };

onMounted(() => {
  fetchData();
});
</script>
