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
    <router-view v-if="!isLoading"/>
  </div>
</template>

<style scoped>

</style>
