    <template>
        <div class="my-5 dark:text-white">
            <div class="flex flex-col gap-3 rounded-3xl">
                <div class="bg-white dark:bg-black rounded-xl w-full overflow-hidden">
                    <img :src="user.banner ? `http://192.168.19.251:8000${user.banner}` : defaultImage" alt="Banner"
                        class="max-h-40 min-w-full object-cover" />
                    <div class="px-6 -mt-12 flex items-center gap-4 justify-between">
                        <img :src="user.profile_photo ? `http://192.168.19.251:8000${user.profile_photo}` : defaultImage"
                            class="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                            alt="Profile Photo" />
                        <BaseButtonOutlinedButton buttonName="Edit Profile" @click="openModal" class="mt-16" />
                    </div>
                    <div class="p-7">
                        <div class="flex-1">
                            <h1 class="text-xl font-semibold">{{ user.username }}</h1>
                            <p class="text-gray-500">{{ user.email }}</p>
                        </div>
                        <p class="text-gray-600 text-sm">{{ user.bio || 'Belum ada bio.' }}</p>
                        <p>Bergabung pada {{ formatTime(user.created_at) }}</p>
                        <div class="mt-4 flex justify-start gap-3 text-sm font-semibold text-gray-700">
                            <span>{{ user.followers || 0 }} Pengikut</span>
                            <span>{{ user.following || 0 }} Ngikutin</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center space-x-10 my-5">
                <SecondaryButton class="text-lg" buttonName="Postingan" @click="activeTab = 'postingan'"
                    :class="{ 'text-gray-500': activeTab === 'postingan' }" />
                <SecondaryButton class="text-lg" buttonName="Balasan" @click="activeTab = 'balasan'"
                    :class="{ 'text-gray-500': activeTab === 'balasan' }" />
                <SecondaryButton class="text-lg" buttonName="Komunitas" @click="activeTab = 'komunitas'"
                    :class="{ 'text-gray-500': activeTab === 'komunitas' }" />
            </div>

            <div v-if="activeTab === 'postingan'" v-for="post in postList" :key="post.id"
                class="flex gap-3 mt-4 bg-white p-5 rounded-3xl dark:bg-[#000000]">
                <div class="space-y-2">
                    <BaseCommunityIcon :image="[post.community_image]" />
                    <BaseImageIcon :image="[post.user_profile]" />
                </div>
                <div class="flex flex-col w-full dark:text-white">
                    <div class="flex justify-between">
                        <div class="flex flex-col items-start">
                            <div class="flex gap-3">
                                <p class="font-bold">{{ post.community?.name || 'Komunitas Tidak Diketahui' }}</p>
                            </div>
                            <p class="text-sm">Dikirim oleh <span class="font-bold"> {{ post.user?.username ||
                                'Pengguna'
                                    }}</span></p>
                        </div>
                        <div>
                            <p>{{ dayjs(post.created_at).fromNow() }}</p>
                        </div>
                    </div>
                    <p class="mt-2">{{ post.description || 'Tidak ada deskripsi.' }}</p>
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

            <div v-if="activeTab === 'komunitas'" class="mt-4 dark:text-white">
                <div class="dark:bg-[#000000] p-5 rounded-3xl flex flex-col gap-3">
                    <AppCommunityList :hideSearchAndOptions="true" :hideTextList="true" />
                </div>
            </div>


            <EditProfileModal ref="modalRef" />
        </div>
    </template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '@/stores/Auth';
import { usePosts } from '@/stores/Posts';
import defaultImage from '/public/assets/default_user_profile_photo.jpg';
import SecondaryButton from '~/components/base/button/SecondaryButton.vue';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Option from "@/components/icons/Option.vue";
import Like from "@/components/icons/Like.vue";
import Bookmark from "@/components/icons/Bookmark.vue";
import Comment from "@/components/icons/Comment.vue";
import Send from "@/components/icons/Send.vue";
import EditProfileModal from "@/components/modal/EditProfileModal.vue"; import { useRoute } from 'vue-router';
import { watch } from 'vue';



dayjs.extend(relativeTime);

const authStore = useAuth();
const postStore = usePosts();
const user = ref({});
const postList = ref([]);
const activeTab = ref('postingan');
const modalRef = ref(null);
const route = useRoute();
const openModal = () => {
    modalRef.value.openModal();
};
const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};


const fetchUser = async () => {
    try {
        const userId = route.params.id;
        console.log("Fetching user with ID:", userId); // Debugging
        user.value = await authStore.profile(userId);
        console.log("User data:", user.value); // Debugging
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

const fetchPosts = async () => {
    try {
        const userId = route.params.id;
        console.log("Fetching posts for user ID:", userId); // Debugging

        const posts = await postStore.fetchUserPosts(userId); // Pastikan API menerima userId
        console.log("Fetched posts:", posts); // Debugging

        if (!posts || posts.length === 0) {
            console.warn("Tidak ada postingan untuk user ini.");
            postList.value = [];
            return;
        }

        postList.value = posts.map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            description: item.description || '',
            image: item.image ? `http://192.168.19.251:8000${item.image}` : "",
            attachment: item.attachment ? `http://192.168.19.251:8000${item.attachment}` : "",
            user: item.user_detail || {},
            user_profile: item.user_detail?.profile_photo ? `http://192.168.19.251:8000${item.user_detail.profile_photo}` : defaultImage,
            community: item.community_detail || {},
            community_image: item.community_detail?.image ? `http://192.168.19.251:8000${item.community_detail.image}` : defaultImage,
            created_at: item.created_at || new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};




const getDropdownItems = (post) => [{
    label: "Hapus",
    onClick: () => handleDeleted(post.id),
}];

const handleDeleted = async (id) => {
    try {
        await postStore.removePost(id);
        postList.value = postList.value.filter((post) => post.id !== id);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

watch(() => route.params.id, () => {
    fetchUser();
    fetchPosts();
}, { immediate: true });
</script>
