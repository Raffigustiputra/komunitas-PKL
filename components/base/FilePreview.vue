<template>
  <div class="rounded-2xl">

    <div v-if="documents && isVideo(documents)" class=" bg-black rounded-lg overflow-hidden">
      <video 
        class="w-full h-full object-fill" 
        :src="documents" 
        controls 
        autoplay 
        loop 
        muted>
      </video>
    </div>

    <p v-else class="text-gray-500 text-center">Tidak ada video yang valid.</p>
  </div>
</template>

<script>
export default {
  props: {
    documents: {
      type: String,
      required: true
    }
  },
  methods: {
    isVideo(fileUrl) {
      return fileUrl && /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(fileUrl);
    }
  }
};
</script>
