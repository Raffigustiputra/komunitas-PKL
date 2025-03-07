<template>
    <div class="flex flex-col bg-white p-6 rounded-3xl overflow-hidden my-8">
        <div class="relative">
          <img :src="komunitasBanner" alt="" class="max-h-64 w-full rounded-3xl object-cover" />
          <div class="absolute -bottom-11 left-8">
            <img :src="komunitasImage" alt="" class="w-28 h-28 rounded border-4 border-white shadow-md object-cover">
          </div>
        </div>
        <div class="p-4 pt-16">
            <div class="flex items-end justify-between gap-7">
                <div class="space-y-3">
                    <h1 class="font-bold text-xl">{{ komunitasNama }}</h1>
                    <p>{{ komunitasDescription }}</p>
                    <div class="flex gap-3 font-bold">
                        <span>0 Admin</span>
                        <span>0 Bergabung</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <BaseDropdownIconDropdown :icon="Option" :dropdownItems="getDropdown(komunitas)"/>
                    <BaseButtonIconButton :icon="Notification" />
                    <BaseButtonOutlinedButton buttonName="Chat" @click="goToDetail(komunitasId)"/>
                    <BaseButtonOutlinedButton buttonName="Bergabung"  @click="openModal(komunitasId)"/>
                </div>
            </div>
        </div>
    </div>

    <div
    class="flex gap-3 mt-4 bg-white p-5 rounded-3xl dark:bg-[#000000]"
    v-for="(post, index) in postList"
    :key="post.id"
    v-if="useAuth().userToken.value"
  >
    <div class="space-y-2">
      <BaseCommunityIcon :image="[post.community_image]" />
      <BaseImageIcon :image="[post.user_profile]" />
    </div>

    <div class="flex flex-col w-full dark:text-white">
      <div class="flex justify-between">
        <div class="flex flex-col items-start">
          <div class="flex gap-3">
            <p class="font-bold">{{ post.community.name }}</p>
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
        <BaseFilePreview :documents="[post.attachment]" />
      </div>
      <div class="flex items-end justify-end">
        <BaseDropdownIconDropdown
          :icon="Option"
          :dropdownItems="getDropdownItems(post)"
        />
      </div>
    </div>
  </div>
  
  <div
    v-if="!postList || postList.length === 0"
    class="flex flex-col items-center text-gray-500"
  >
    Tidak ada Postingan untuk ditampilkan.
  </div>

  <BaseLoading :isLoading="loading" />

  <BaseAlertPrimaryAlert
    v-if="alertVisible"
    :message="alertMessage"
    :type="alertColor"
  />
  <ModalAlertModal buttonName="Tetap Gabung" header="Yakin ingin bergabung?" paragraph="Isinya orang jamet  " ref="modalRef" :clicking="JoinCommunity"  />
  <ModalAlertModal buttonName="Hapus" header="Konfirmasi Hapus" paragraph="Apakah Anda yakin ingin menghapus komunitas ini?" ref="modalDeleteRef":clicking="confirmDeleteCommunity"/>

</template>

<script setup>
import Option from "~/components/icons/Option.vue";
import Notification from "~/components/icons/Notification.vue";
import { useRoute, useRouter } from "vue-router";
import { useKomunitas } from "~/stores/Komunitas.js";
import { usePosts } from "~/stores/Posts.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "~/stores/Auth";
import { ref, computed, onMounted } from "vue";

const postStore = usePosts();
const postList = ref([]);
const route = useRoute();
const router = useRouter();
const komunitasStore = useKomunitas();
const komunitasId = ref(route.params.id);
const komunitasNama = ref("");
const komunitasBanner = ref("");
const komunitasDescription = ref("");
const komunitasImage = ref("");
const authStore = useAuth();
const account = ref(null);
const currentUserId = computed(() => account.value?.id || null);
const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");
dayjs.extend(relativeTime);
const modalRef = ref(null);
const selectedKomunitasId = ref(null);
const modalDeleteRef = ref(null);

const openModal = (komunitasId) => {
  selectedKomunitasId.value = komunitasId;
  modalRef.value.openModal();
};

const fetchAccount = async () => {
  try {
    const auth = await authStore.profile();
    account.value = auth;
    console.log("User yang sedang login:", account.value);
  } catch (error) {
    console.error("Error fetching account:", error);
  }
};

const fetchKomunitasDetails = async () => {
  try {
    const communities = await komunitasStore.fetchKomunitas();
    const komunitas = communities.find((k) => k.id == komunitasId.value);
    console.log(komunitasId); // Debugging

    if (komunitas) {
      komunitasNama.value = komunitas.name;
      komunitasId.value = komunitas.id;
      komunitasDescription.value = komunitas.description;
      komunitasImage.value = komunitas.image
        ? `http://192.168.19.251:8000${komunitas.image}`
        : null;
      komunitasBanner.value = komunitas.banner
        ? `http://192.168.19.251:8000${komunitas.banner}`
        : null;
    } else {
      komunitasNama.value = "Komunitas Tidak Ditemukan";
      komunitasImage.value = null;
    }
  } catch (error) {
    console.error("Error fetching komunitas:", error);
  }
};


const fetchPosts = async () => {
  try {
    const posts = await postStore.fetchCommunityPosts(komunitasId.value);
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
      community_image: item.community_detail.image
        ? `http://192.168.19.251:8000${item.community_detail.image}`
        : "/assets/default_user_profile_photo.jpg",
      visibility: item.visibility,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    console.error(error);
  }
};

const goToDetail = (id) => {
  router.push(`/communitydetail/chat/${id}`);
};

const getDropdown = (komunitasId) => {
  console.log("Komunitas ID sebelum hapus:", komunitasId);
  return [
    { label: "Hapus", onClick: () => deleteCommunity(komunitasId) }
  ];
};

const deleteCommunity = () => {
  // Buka modal konfirmasi hapus sebelum benar-benar menghapus
  modalDeleteRef.value.openModal();
};

const confirmDeleteCommunity = async () => { 
  if (!komunitasId.value) {
    console.error("Error: komunitasId tidak valid atau undefined.");
    return;
  }

  try {
    const success = await komunitasStore.removeKomunitas(komunitasId.value);

    if (success) {
      // Langsung redirect setelah komunitas berhasil dihapus
      router.push("/community-list");
    } else {
      console.error("Gagal menghapus komunitas.");
    }
  } catch (error) {
    console.error(`Error deleting community with ID ${komunitasId.value}:`, error);
  }
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

onMounted(() => {
  fetchKomunitasDetails();
  fetchPosts();
  fetchAccount();
});

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

definePageMeta({
  middleware: "auth",
  layout: "community",
});
</script>
