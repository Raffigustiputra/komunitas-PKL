<template>
    <div class="flex justify-between items-center">
        <BaseCheckboxTertiaryCheck label="Pilih semua" v-model="isChecked" :onClick="handleCheckboxClick"/>
        <BaseButtonPrimaryButton buttonName="Buat Komunitas" :icon="Add" @click="openModal"/>
    </div>
    <CreateCommunityModal ref="modalRef" />
</template>

<script setup>
import Add from '~/components/icons/Add.vue';
import CreateCommunityModal from "@/components/modal/CreateCommunityModal.vue";
import { ref } from "vue";

const isChecked = ref(false);
const modalRef = ref(null);
const openModal = () => { modalRef.value.openModal(); };
</script>
