<template>
  <div class="flex min-h-screen justify-center dark:bg-[#000000]">
    
    <aside class="w-[290px] px-4" v-if="useAuth().userToken.value">
      <AppSidebar />
    </aside>

    <main class="w-[670px] min-h-screen p-3 bg-[#F4F7FD] dark:bg-[#1d1d25]" >
      <slot />
    </main>

    <aside class="w-[470px] px-5 hidden lg:block" v-if="useAuth().userToken.value">
      <AppRecomendations/>
    </aside>

  </div>
</template>
