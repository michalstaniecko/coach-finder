<script setup lang="ts">
import {useUserStore} from "@/stores";
import TheHeader from "@/components/layout/TheHeader.vue";
import {onMounted} from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.init();
});
</script>

<template>
  <the-header/>
  <div class="container">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
