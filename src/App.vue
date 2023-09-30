<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import {useCoachesStore} from "@/stores";
import {onMounted, ref} from "vue";

const isLoading = ref(false);

const coachesStore = useCoachesStore();

onMounted(async () => {
  isLoading.value = true;
  await coachesStore.loadAndSetCoaches();
  isLoading.value = false;
});
</script>

<template>
  <the-header/>
  <div class="container">
    <router-view v-if="!isLoading"/>
  </div>
</template>

<style scoped>

</style>
