<template>
    <BaseLoading :isLoading="loading" />
    <div 
        class="flex flex-col bg-white rounded-3xl px-5 py-3 hover:shadow-md hover:cursor-pointer shadow-sm" 
        v-for="(komunitas, index) in komunitasList" 
        :key="komunitas.id"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
    >
        <div class="flex items-center gap-3 justify-between">
            <div @click="goToDetail(komunitas.id)" class="flex items-center gap-4">
                <BaseImageIcon :image="komunitas.image" />
                <p class="font-bold">{{ komunitas.nama_komunitas }}</p>
            </div>
            <div class="flex gap-3" v-if="hoveredIndex === index">
                <BaseButtonDeleteButton :icon="Trash" @click="handleDeleted(komunitas.id)" v-if="komunitas.member.includes(userData?.value?.id)"/>
                <BaseButtonEditButton :icon="Pencil" @click="handleEdit(komunitas.id)" v-if="komunitas.member.includes(userData?.value?.id)"/>
            </div>
        </div>
    </div>
    <div v-if="!komunitasList || komunitasList.length === 0" class="text-center text-gray-500">
        Tidak ada komunitas untuk ditampilkan.
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { useKomunitas } from "~/stores/Komunitas";
    import BaseLoading from "@/components/base/Loading.vue";
    import Trash from '~/components/icons/Trash.vue';
    import Pencil from '~/components/icons/Pencil.vue';

    const loading = ref(true);
    const userData = ref(null);
    const router = useRouter();
    const komunitasStore = useKomunitas();
    const komunitasList = ref([]);
    const hoveredIndex = ref(null);

    definePageMeta({
        middleware: 'auth',
    });

    onMounted(() => {
        fetchData();
    });

    const fetchData = async () => {
        loading.value = true;
        userData.value = useCookie("user");
        try {
            const [communities, categories] = await Promise.all([
                komunitasStore.fetchJoinedKomunitas(),
                komunitasStore.CategoryKomunitas(),
            ]);
            komunitasList.value = communities.map((item) => ({
                id: item.id,
                nama_komunitas: item.name, 
                deskripsi: item.description,
                image: item.image ? `http://192.168.19.251:8000${item.image}` : "https://placehold.co/400x400",
                member: item.members,
                visibility: item.visibility,
                category: categories.find((cat) => cat.id === item.category)?.name || "Tidak ada kategori",
            })); 
            console.log( komunitasList.value)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loading.value = false;
        }
    };

    const handleDeleted = async (id) => {
        try {
            const success = await komunitasStore.removeKomunitas(id);
            if (success) {
                komunitasList.value = komunitasList.value.filter((komunitas) => komunitas.id !== id);
                alert("Komunitas berhasil dihapus.");
            }
        } catch (error) {
            console.error("Error deleting community:", error);
            alert("Gagal menghapus komunitas.");
        }
    };

    const goToDetail = (id) => {
        router.push(`/communitydetail/${id}`);
    };
    
    const handleJoin = (id) => {
        router.push(`/communitydetail/chat/${id}`);
    };

</script>