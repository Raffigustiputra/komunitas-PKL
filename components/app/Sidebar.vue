<template>
  <nav class="w-64 h-screen p-4 flex flex-col fixed">
    <div class="mx-3">
      <AppLogo />
    </div>

    <div class="mt-8 space-y-1">
      <BaseButtonSidebarButton :onClick="() => navigateTo('/')" buttonName="Homepage" :icon="Homepage" path="/" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/listkomunitas-admin')" buttonName="Komunitas"
        :icon="Community" path="/listkomunitas-admin" />
      <BaseButtonSidebarButton buttonName="Pencarian" :icon="Search" />
      <BaseButtonSidebarButton buttonName="Bookmark" :icon="Bookmark" />
      <BaseButtonSidebarButton buttonName="Notifikasi" :icon="Notification" />
      <BaseButtonSidebarButton :onClick="() => navigateTo('/pengaturan')" path="/pengaturan" buttonName="Pengaturan"
        :icon="Setting" />
      <BaseButtonSidebarButton :onClick="() => useAuth().logout()" buttonName="Logout" :icon="Logout" />
    </div>

    <div class="flex flex-col mt-12">
      <BaseButtonPrimaryButton buttonName="Posting" :icon="Add" @click="openModal" />
    </div>
    <CreatePostModal ref="modalRef" />

    <div class="mt-auto flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <BaseImageIcon />
        <div class="flex flex-col">
          <BaseText text="User 1" />
          <BaseText text="user1@gmail.com" textColor="text-[#414141]" fontSize="text-sm" />
        </div>
        <div>
          <BaseButtonIconButton :icon="Option" />
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
import Option from '~/components/icons/Option.vue';
import Add from '~/components/icons/Add.vue';
import CreatePostModal from "@/components/modal/CreatePostModal.vue";
import { ref } from "vue";

const modalRef = ref(null);
const openModal = () => { modalRef.value.openModal(); };
</script>