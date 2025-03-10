<template>
  <div class="flex flex-col bg-white p-6 rounded-3xl overflow-hidden mt-8 dark:bg-black dark:text-white">
    <div class="relative">
      <img
        :src="komunitasBanner"
        alt=""
        class="min-h-64 max-h-64 w-full rounded-3xl object-cover"
      />
      <div class="absolute -bottom-11 left-8">
        <img :src="komunitasImage" alt="" class="w-28 h-28 rounded border-4 border-white shadow-md object-cover" />
      </div>
    </div>
    <div class="p-4 pt-16">
      <div class="flex items-end justify-between gap-7">
        <div class="space-y-3">
          <h1 class="font-bold text-xl dark:text-white">{{ komunitasNama }}</h1>
          <p class="dark:text-gray-300">{{ komunitasDescription || 'Belum ada Deskripsi.' }}</p>
          <div class="flex gap-3 font-bold">
            <span>0 Admin</span>
            <span>0 Bergabung</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <BaseDropdownIconDropdown :icon="Option" :dropdownItems="getDropdown(komunitasId)" />
          <BaseButtonIconButton :icon="Notification" />
          <BaseButtonOutlinedButton
            buttonName="Edit"
            @click="openEditModal(komunitasId)"
          />
          <BaseButtonOutlinedButton
            buttonName="Chat"
            @click="goToDetail(komunitasId)"
          />
          <BaseButtonOutlinedButton
            buttonName="Bergabung"
            @click="openModal(komunitasId)"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="flex justify-center space-x-10 my-5">
    <BaseButtonSecondaryButton class="text-lg dark:text-white" buttonName="Postingan" @click="activeTab = 'postingan'"
      :class="{ 'text-gray-500': activeTab === 'postingan' }" />
    <BaseButtonSecondaryButton class="text-lg dark:text-white" buttonName="Anggota" @click="activeTab = 'anggota'"
      :class="{ 'text-gray-500': activeTab === 'anggota' }" />
  </div>

  <!-- Konten Postingan -->
  <div v-if="activeTab === 'postingan'" class="flex gap-5">
    <div class="flex flex-col w-3/4 space-y-4">
      <div class="flex gap-3 bg-white p-5 rounded-3xl dark:bg-black dark:text-white" v-for="(post, index) in postList"
        :key="post.id" v-if="useAuth().userToken.value">
        <div class="space-y-2">
          <BaseCommunityIcon :image="[post.community_image]" />
          <BaseImageIcon :image="[post.user_profile]" />
        </div>
        <div class="flex flex-col w-full">
          <div class="flex justify-between">
            <div class="flex flex-col items-start">
              <div class="flex gap-3">
                <p class="font-bold dark:text-white">{{ post.community.name }}</p>
              </div>
              <p class="text-sm dark:text-gray-300">
                Dikirim oleh <span class="font-bold"> {{ post.user.username }}</span>
              </p>
            </div>
            <div>
              <p class="dark:text-gray-400">{{ dayjs(post.created_at).fromNow() }}</p>
            </div>
          </div>
          <p class="mt-2 dark:text-gray-300">{{ post.description }}</p>
          <div v-if="post.image" class="flex mb-3">
            <BaseImagePost :images="[post.image]" />
          </div>
          <div v-if="post.attachment">
            <BaseFilePreview :documents="[post.attachment]" />
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
      <!-- Jika tidak ada postingan -->
      <div v-if="activeTab === 'postingan' && (!postList || postList.length === 0)"
        class="flex flex-col items-center text-gray-500 mt-10 dark:text-gray-400">
        Tidak ada Postingan untuk ditampilkan.
      </div>
    </div>

    <!-- Sidebar -->
    <div class="sticky flex flex-col gap-5 top-4 w-1/3 max-h-fit bg-white dark:bg-black dark:text-white rounded-3xl p-5">
      <div>
        <h3 class="font-bold text-lg mb-2">Peraturan Komunitas</h3>
        <p class="dark:text-gray-300">{{ komunitasRules || 'Belum ada Peraturan yang dibuat' }}</p>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2">Kontributor Teratas</h3>
      </div>
    </div>
  </div>

  <div v-if="activeTab === 'anggota'">
    <div class="ms-2 font-bold dark:text-white">
      <p>Anggota - {{ komunitasMembers_count }}</p>
    </div>
    <div class="flex bg-white dark:bg-black dark:text-white mt-5 justify-between items-center p-3 rounded-3xl" v-for="(members) in komunitasMembers"
      :key="members.id">
      <div class="flex items-center gap-3">
        <BaseImageIcon
          :image="members.profile_photo ? `http://192.168.19.251:8000${members.profile_photo}` : defaultImage" />
        <div>
          <p class="font-bold dark:text-white">{{ members.username }}</p>
          <p class="dark:text-gray-300">{{ members.bio }}</p>
        </div>
      </div>
      <div v-for="(members_role) in members.role_detail.filter(role => role.community === komunitasId)" :key="index">
        <p class="font-bold mx-4 dark:text-white">{{ members_role.role }}</p>
      </div>
    </div>
  </div>

  <BaseLoading :isLoading="loading" />
  <BaseAlertPrimaryAlert v-if="alertVisible" :message="alertMessage" :type="alertColor" />
  <ModalAlertModal buttonName="Tetap Gabung" header="Yakin ingin bergabung?" paragraph="Isinya orang jamet "
    ref="modalRef" :clicking="JoinCommunity" />
  <ModalAlertModal buttonName="Hapus" header="Konfirmasi Hapus"
    paragraph="Apakah Anda yakin ingin menghapus komunitas ini?" ref="modalDeleteRef"
    :clicking="confirmDeleteCommunity" />

  <BaseAlertPrimaryAlert
    v-if="alertVisible"
    :message="alertMessage"
    :type="alertColor"
  />

  <ModalAlertModal
    buttonName="Tetap Gabung"
    header="Yakin ingin bergabung?"
    paragraph="Isinya orang jamet  "
    ref="modalRef"
    :clicking="JoinCommunity"
  />
  <ModalAlertModal
    buttonName="Hapus"
    header="Konfirmasi Hapus"
    paragraph="Apakah Anda yakin ingin menghapus komunitas ini?"
    ref="modalDeleteRef"
    :clicking="confirmDeleteCommunity"
  />
  <ModalEditCommunityModal
    ref="modalEditRef"
  />
</template>

<script setup>
import Option from "~/components/icons/Option.vue";
import Notification from "~/components/icons/Notification.vue";
import Like from "@/components/icons/Like.vue";
import Bookmark from "@/components/icons/Bookmark.vue";
import Comment from "@/components/icons/Comment.vue";
import Send from "@/components/icons/Send.vue";
import { useRoute, useRouter } from "vue-router";
import { useKomunitas } from "~/stores/Komunitas.js";
import { usePosts } from "~/stores/Posts.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "~/stores/Auth";
import { ref, computed, onMounted } from "vue";
import defaultImage from '/public/assets/default_user_profile_photo.jpg';


const postStore = usePosts();
const postList = ref([]);
const route = useRoute();
const router = useRouter();
const komunitasStore = useKomunitas();
const komunitasId = ref(route.params.id);
const komunitasNama = ref("");
const komunitasRules = ref("");
const komunitasBanner = ref("");
const komunitasDescription = ref("");
const komunitasImage = ref("");
const komunitasMembers = ref("");
const komunitasMembersRole = ref("");
const komunitasMembers_count = ref("");
const authStore = useAuth();
const account = ref(null);
const currentUserId = computed(() => account.value?.id || null);
const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref("");
dayjs.extend(relativeTime);
const modalRef = ref(null);
const modalEditRef = ref(null);
const selectedKomunitasId = ref(null);
const modalDeleteRef = ref(null)
const activeTab = ref("postingan");

const openModal = (komunitasId) => {
  selectedKomunitasId.value = komunitasId;
  modalRef.value.openModal();
};

const openEditModal = (id) => {
  selectedKomunitasId.value = id;
  modalEditRef.value.openModal({
    id: komunitasId.value,
    name: komunitasNama.value,
    rules: komunitasRules.value,
    description: komunitasDescription.value,
    image: komunitasImage.value,
    banner: komunitasBanner.value,
  });
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
    
    if (komunitas) {
      komunitasNama.value = komunitas.name;
      komunitasRules.value = komunitas.rules;
      komunitasId.value = komunitas.id;
      komunitasDescription.value = komunitas.description;
      komunitasMembers.value = komunitas.members;
      komunitasMembers_count.value = komunitas.members_count;
      komunitasImage.value = komunitas.image
        ? `http://192.168.19.251:8000/${komunitas.image}`
        : "../assets/default_user_profile_photo.jpg";
      
      komunitasBanner.value = komunitas.banner
        ? `http://192.168.19.251:8000/${komunitas.banner}`
        : "../assets/default_banner.jpg";
        console.log(komunitasMembersRole.value)
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
  return [{ label: "Hapus", onClick: () => deleteCommunity(komunitasId) }];
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
    console.error(
      `Error deleting community with ID ${komunitasId.value}:`,
      error
    );
  }
};

const getDropdownItems = (post) => {
  let items = [
    { label: "Laporkan", onClick: () => console.log("Laporkan diklik") },
  ];
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
