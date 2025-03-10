<template>
  <div class="flex gap-3 bg-white p-5 rounded-3xl dark:bg-[#000000]" v-for="(post, index) in postList" :key="post.id"
    v-if="useAuth().userToken.value">
    <div class="space-y-2">
      <div @click="goToCommunityPage(post.community.id)" class="cursor-pointer">
        <BaseCommunityIcon :image="[post.community_image]" />
      </div>
      <div @click="goToUserProfile(post.user.id)" class="cursor-pointer">
        <BaseImageIcon :image="[post.user_profile]" />
      </div>

    </div>

    <div class="flex flex-col w-full dark:text-white">
      <div class="flex justify-between">
        <div class="flex flex-col items-start">
          <div class="flex gap-3">
            <a @click="goToCommunityPage(post.community.id)" class="font-bold cursor-pointer text-black no-underline dark:text-white">
              {{ post.community.name }}
            </a>
            <BaseButtonSecondaryButton buttonName="Gabung" v-if="!isUserJoined(post.community.id)"
              @click="openModal(post.community.id)" />
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
      <div v-if="post.image" class="flex mb-3">
        <BaseImagePost :images="[post.image]" />
      </div>
      <div v-if="post.attachment">
       <BaseFilePreview :documents="post.attachment" />
      </div>

      <div class="flex items-end justify-between mt-5">
      <BaseButtonIconButton :icon="Like" />
      <BaseButtonIconButton :icon="Bookmark" />
      <BaseButtonIconButton :icon="Comment" />
      <BaseButtonIconButton :icon="Send" />

      <BaseDropdownIconDropdown :icon="Option" :dropdownItems="getDropdownItems(post)" />
      </div>
    </div>
  </div>

  <div v-if="!postList || postList.length === 0" class="flex flex-col items-center text-gray-500">
    Tidak ada Postingan untuk ditampilkan.
  </div>

  <BaseLoading :isLoading="loading" />

  <BaseAlertPrimaryAlert v-if="alertVisible" :message="alertMessage" :type="alertColor" />
  <ModalAlertModal buttonName="Tetap Gabung" header="Yakin ingin bergabung?" paragraph="Isinya orang jamet  "
    ref="modalRef" :clicking="JoinCommunity" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/stores/Auth";
import { usePosts } from "~/stores/Posts.js";
import { useKomunitas } from "~/stores/Komunitas.js";
import BaseImagePost from "~/components/base/ImagePost.vue";
import BaseLoading from "@/components/base/Loading.vue";
import Option from "@/components/icons/Option.vue";
import Like from "@/components/icons/Like.vue";
import Bookmark from "@/components/icons/Bookmark.vue";
import Comment from "@/components/icons/Comment.vue";
import Send from "@/components/icons/Send.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'vue-router';

dayjs.extend(relativeTime);

const router = useRouter();
const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");
const postStore = usePosts();
const postList = ref([]);
const loading = ref(true);
const authStore = useAuth();
const komunitasStore = useKomunitas();
const account = ref(null);
const currentUserId = computed(() => account.value?.id || null);
const modalRef = ref(null);
const selectedKomunitasId = ref(null);

const openModal = (komunitasId) => {
  selectedKomunitasId.value = komunitasId;
  modalRef.value.openModal();
};

const fetchAccount = async () => {
  try {
    loading.value = true;
    const auth = await authStore.profile();
    account.value = auth;
    console.log("User yang sedang login:", account.value);
  } catch (error) {
    console.error("Error fetching account:", error);
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  try {
    loading.value = true;
    const [posts] = await Promise.all([postStore.fetchPosts()]);
    postList.value = posts.map((item) => ({
      id: item.id,
      description: item.description,
      image: item.image ? `http://192.168.19.251:8000${item.image}` : "",
      attachment: item.attachment
        ? `http://192.168.19.251:8000${item.attachment}`
        : "",
      user: item.user_detail,
      user_id: item.user_detail.id,
      user_profile: item.user_detail.profile_photo
        ? `http://192.168.19.251:8000${item.user_detail.profile_photo}`
        : "/assets/default_user_profile_photo.jpg",
      community: item.community_detail,
      community_image: item.community_detail.image ? `http://192.168.19.251:8000${item.community_detail.image}`
        : "/assets/default_user_profile_photo.jpg",
      visibility: item.visibility,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
};

const goToCommunityPage = (communityId) => {
  router.push(`/communitydetail/${communityId}`);
};

const goToUserProfile = (userId) => {
  router.push(`#`);
};


const getDropdownItems = (post) => {
  let items = [{ label: "Laporkan", onClick: () => console.log("Laporkan diklik") }];
  if (post.user_id === currentUserId.value) {
    items.push({
      label: "Hapus",
      onClick: () => handleDeleted(post.id),
    });
  }
  return items;
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
    console.error("Error deleting post:", error);
    alertMessage.value = "Terjadi kesalahan saat menghapus.";
    alertColor.value = "error";
    alertVisible.value = true;
  } finally {
    setTimeout(() => {
      alertVisible.value = false;
    }, 3000);
  }
};

const JoinCommunity = async () => {
  if (!selectedKomunitasId.value) return;
  try {
    await komunitasStore.fetchJoiningKomunitas(selectedKomunitasId.value);
    console.log("Berhasil bergabung dengan komunitas!");
    router.push(`/communitydetail/chat/${selectedKomunitasId.value}`);
  } catch (error) {
    console.error("Gagal bergabung:", error);
  }
};

const isUserJoined = (communityId) => {
  return account.value?.role_detail?.some(role => role.community === communityId);
};

onMounted(async () => {
  await fetchAccount();
  await fetchData();
  isUserJoined()
});
</script>
