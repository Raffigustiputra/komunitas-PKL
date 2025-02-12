    <template>
        <div class="flex items-center justify-between px-3 py-2 bg-[#133E87]">
            <!-- Header Title -->
            <h1 class="text-[#F3F3E0] font-bold text-2xl">
                Komunitas App
            </h1>

            <!-- Dropdown Menus -->
            <div class="flex space-x-4 items-center">
                <!-- Dashboard Awal Button -->
                <button @click="navigateTo('/')"
                    class="text-[#F3F3E0] font-bold px-4 py-2 bg-[#1F497D] rounded-md hover:bg-[#153E6B] focus:outline-none focus:ring"
                    v-if="useAuth().userToken.value">
                    Home Page
                </button>

                <!-- Admin Dropdown -->
                <div class="relative" @click="toggleAdminMenu">
                    <button
                        class="text-[#F3F3E0] font-bold px-4 py-2 bg-[#1F497D] rounded-md hover:bg-[#153E6B] focus:outline-none focus:ring" 
                        v-if="useAuth().userToken.value">
                        Admin Menu
                    </button>
                    <div v-if="isAdminMenuOpen"
                        class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-10">
                        <ul class="text-[#133E87]">
                            <li>
                                <button @click="navigateTo('/createkomunitas-admin')"
                                    class="block w-full text-left px-4 py-2 hover:bg-[#f0f0f0]">Create
                                    Komunitas</button>
                            </li>
                            <li>
                                <button @click="navigateTo('/listkomunitas-admin')"
                                    class="block w-full text-left px-4 py-2 hover:bg-[#f0f0f0]"
                                    >List Komunitas
                                    Admin</button>
                            </li>
                            <li>

                            </li>
                        </ul>
                    </div>

                </div>
                <button @click="useAuth().logout()"
                    class="text-[#F3F3E0] font-bold px-4 py-2 bg-[#1F497D] rounded-md hover:bg-[#153E6B] focus:outline-none focus:ring"
                    v-if="useAuth().userToken.value">
                    Logout
                </button>

                <!-- Member Dropdown -->

            </div>
        </div>
    </template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAdminMenuOpen = ref(false);
const isMemberMenuOpen = ref(false);

// Fungsi navigasi untuk Nuxt
function navigateTo(path) {
    console.log(`Navigating to: ${path}`);
    router.push(path);
    closeMenus();
}

// Fungsi untuk membuka/tutup Admin menu
function toggleAdminMenu(event) {
    event.stopPropagation();
    isAdminMenuOpen.value = !isAdminMenuOpen.value;
    if (isAdminMenuOpen.value) isMemberMenuOpen.value = false; // Tutup menu lain
}

// Fungsi untuk membuka/tutup Member menu
function toggleMemberMenu(event) {
    event.stopPropagation();
    isMemberMenuOpen.value = !isMemberMenuOpen.value;
    if (isMemberMenuOpen.value) isAdminMenuOpen.value = false; // Tutup menu lain
}

// Fungsi untuk menutup semua menu
function closeMenus() {
    isAdminMenuOpen.value = false;
    isMemberMenuOpen.value = false;
}

// Fungsi untuk menutup menu saat klik di luar area
function handleClickOutside(event) {
    if (
        (isAdminMenuOpen.value && !event.target.closest('.relative')) ||
        (isMemberMenuOpen.value && !event.target.closest('.relative'))
    ) {
        closeMenus();
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Styling untuk efek hover dan transisi */
button {
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #1f497d;
}
</style>