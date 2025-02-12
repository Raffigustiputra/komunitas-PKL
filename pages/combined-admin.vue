<template>
    <div>
        <create-komunitas-admin @addKomunitas="addKomunitas" />
        <list-komunitas-admin :komunitasList="listKomunitas" @removeKomunitas="removeKomunitas" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateKomunitasAdmin from './createkomunitas-admin.vue';
import ListKomunitasAdmin from './listkomunitas-admin.vue';

const listKomunitas = ref([]); // Pastikan listKomunitas memiliki nilai awal berupa array kosong

function addKomunitas(newKomunitas) {
    console.log('Data yang diterima dari createkomunitas-admin:', newKomunitas);
    listKomunitas.value.push(newKomunitas); // Tambahkan komunitas baru
    console.log('Isi listKomunitas setelah ditambahkan:', listKomunitas.value);
}

function removeKomunitas(index) {
    console.log('Index yang dihapus:', index);
    listKomunitas.value.splice(index, 1); // Hapus komunitas berdasarkan indeks
    console.log('Isi listKomunitas setelah dihapus:', listKomunitas.value);
}
</script>
