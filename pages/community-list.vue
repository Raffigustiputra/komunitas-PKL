<template>
    <title>Komunitas / KomunitasApp</title>
    <div class="flex flex-col gap-3">
        <!-- <div class="flex justify-between">
            <h1 class="text-2xl font-bold text-center my-6">List Komunitas</h1>
            <div class="flex items-center gap-1">
                <BaseButtonIconButton :icon="Search"/>
                <BaseButtonIconButton :icon="Option"/>
            </div>
        </div> -->
        <AppCommunityList />
        <div class="my-10">
            <AppCommunityListButton />
        </div>
    </div>
</template>

<script setup>
    import Search from '~/components/icons/Search.vue';
    import Option from '~/components/icons/Option.vue';
</script>
