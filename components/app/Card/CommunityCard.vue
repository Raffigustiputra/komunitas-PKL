<template>
  <div class="relative max-w-72 bg-[#F4F7FD] rounded-xl overflow-hidden  dark:bg-[#1d1d25]">
    <div class="relative">
      <img :src="bannerImage" alt="" />
      <div class="absolute -bottom-6 left-4">
        <BaseImageIcon :image="iconImage" />
      </div>
    </div>
    <div class="p-4 pt-8">
      <div class="flex items-start justify-between">
        <div>
          <a class="text-lg font-bold" @click="headerClick">
            {{ communityName }}
          </a>
          <div class="flex items-center gap-2 my-2">
            <BaseButtonCategoryButton @click="categoryClick" :buttonName="Category"/>
            <BaseButtonCategoryButton />
          </div>
          <p class="text-sm text-gray-600">
            {{ description.slice(0, 50)
            }}{{ description.length > 50 ? "..." : "" }}
          </p>
        </div>
        <BaseButtonOutlinedButton buttonName="Gabung" @click="buttonClick" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultImage from '/public/assets/default_user_profile_photo.jpg';
import defaultBanner from '/public/assets/default_banner.jpg';

export default {
  props: {
    communityName: {
      type: String,
      default: "Nama Komunitas",
    },
    description: {
      type: String,
      default: "",
    },
    headerClick: {
      type: Function,
      default: () => () => {},
    },
    categoryClick: {
      type: Function,
      default: () => () => {},
    },
    iconImage: {
      type: String,
      default: defaultImage,
    },
    bannerImage: {
      type: String,
      default: defaultBanner,
    },
    Category: {
      type: String,
      default: "cateogry",
    },
  },
};
</script>
