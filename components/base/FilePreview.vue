<template>
    <div class="p-4 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
      <h2 class="text-xl font-bold mb-4">Daftar Dokumen</h2>
      <ul>
        <li v-for="doc in documents" :key="doc.id" class="flex justify-between items-center mb-2">
          <span>{{ doc.name }}</span>
          <a :href="doc.url" download
             class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Download
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
  props: {
    documents: {
      type: Array,
      required: true
    }
},

};
</script>