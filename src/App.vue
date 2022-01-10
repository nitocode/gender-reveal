<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Github pages SPA workaround
  let path = localStorage.getItem('path');
  if (path) {
    localStorage.removeItem('path');
    router.push(path);
  }
})
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center overflow-hidden">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>