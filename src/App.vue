<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import {useCoachesStore} from "@/stores";
import {onMounted, ref} from "vue";

const isLoading = ref(false);
const error = ref<string | null>();

const coachesStore = useCoachesStore();

onMounted(async () => {
  isLoading.value = true;
  try {
    await coachesStore.loadAndSetCoaches();
  } catch (e) {
    error.value = (e as Error).message;
  }
  isLoading.value = false;
});
</script>

<template>
  <base-dialog v-if="!!error" title="An error occurred!" type="danger">
    <p>{{ error }}</p>
  </base-dialog>
  <the-header/>
  <div class="container">
    <router-view v-if="!isLoading" v-slot="{Component}">
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

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
</style>
