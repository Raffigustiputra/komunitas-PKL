<template>
  <div class="flex justify-center dark:bg-[#000000]">
    <aside class="w-[290px] px-4" v-if="useAuth().userToken.value">
      <AppSidebar />
    </aside>

    <main class="w-[1140px] min-h-screen px-3 bg-[#F4F7FD] dark:bg-[#1d1d25]" >
      <slot />
    </main>

  </div>
</template>
