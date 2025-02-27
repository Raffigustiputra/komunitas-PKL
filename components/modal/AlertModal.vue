<template>
    <div v-if="isOpen" @click.self="closeModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl w-[350px] md:w-[450px] lg:w-[500px] shadow-lg flex flex-col">
            <div class= "flex flex-col gap-4">
                <h1 class="text-2xl font-bold">{{ header }}</h1>
                <p>{{ paragraph }}</p>
                <div class="flex items-center gap-4 justify-end mt-5">
                    <BaseButtonOutlinedButton buttonName="Batal" @click="closeModal"/>
                    <BaseButtonOutlinedButton :buttonName="buttonName" @click="() => handleClick(clicking)" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: {
            type: String,
            default: "Ini Header"
        },
        paragraph: {
            type: String,
            default: "Ini bagian paragraf"
        },
        buttonName: {
            type: String
        },
        clicking: {
            type: Function,
            default: () => () => {}
        }
    },
    methods: {
        handleClick() {
            this.clicking(); 
            this.closeModal(); 
        }
    }
};

</script>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
    document.body.style.overflow = "hidden";
};

const closeModal = () => {
    isOpen.value = false;
    document.body.style.overflow = "";
};

const handleClick = (clicking) => {
    clicking(); // Jalankan fungsi yang dikirim dari props
    closeModal(); // Tutup modal setelah aksi selesai
};

defineExpose({ openModal });
</script>
