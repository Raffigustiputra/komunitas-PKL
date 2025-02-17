<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-b-3xl sticky top-0 z-50 dark:bg-black/80">
    <div class="flex justify-evenly items-center m-2">
      <BaseButtonTopbarButton :onClick="() => navigateTo('/')" path="/" buttonName="For You" />
      <BaseButtonTopbarButton buttonName="Komunitas" />
    </div>
  </div>
</template>
