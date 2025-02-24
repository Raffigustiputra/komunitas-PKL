<template>
    <title>Homepage / KomunitasApp</title>
    <div class="flex flex-col gap-5">
             <AppTopbar />
             <AppFeedInput />   
             <AppFeed />
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: "auth",
    });
</script>

