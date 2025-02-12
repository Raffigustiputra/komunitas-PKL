<template>
  <nav class="w-64 h-screen p-4 flex flex-col fixed" v-if="useAuth().userToken.value">
    <div>
      <AppLogo />
    </div>

    <div class="mt-10">
      <BaseSidebarButton @click="navigateTo('/')" buttonName="Homepage" :icon="Homepage" />
      <BaseSidebarButton @click="navigateTo('/listkomunitas-admin')" buttonName="Komunitas" :icon="Community" />
      <BaseSidebarButton buttonName="Pencarian" :icon="Search" />
      <BaseSidebarButton buttonName="Bookmark" :icon="Bookmark" />
      <BaseSidebarButton buttonName="Notifikasi" :icon="Notification" />
      <BaseSidebarButton buttonName="Pengaturan" :icon="Setting" />
      <BaseSidebarButton @click="useAuth().logout()" buttonName="Logout" :icon="Logout"/>
    </div>

    <div class="mt-auto flex flex-col gap-4">
      <SidebarPostButton />
      <div class="flex gap-4 items-center">
        <ImageIcon />
        <div class="flex flex-col">
          <TextRegular regularText="User 1" />
          <TextRegular smallText="user1@gmail.com" textColor="#414141" />
        </div>
        <div>
          <IconButton :svg="options" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
    import Homepage from '~/components/icons/Homepage.vue';
    import Community from '~/components/icons/Community.vue';
    import Search from '~/components/icons/Search.vue';
    import Bookmark from '~/components/icons/Bookmark.vue';
    import Notification from '~/components/icons/Notification.vue';
    import Setting from '~/components/icons/Setting.vue';
    import Logout from '~/components/icons/Logout.vue';
</script>