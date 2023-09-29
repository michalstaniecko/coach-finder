<script setup lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import {computed, reactive, onMounted, ref} from "vue";
import {useCoachesStore} from "@/stores";
import type {AxiosError} from "axios";

const isLoading = ref(false);
const error = ref();

const data = reactive<{
  filters: {[key: string]: boolean}
}>({
  filters: {
    frontend: true,
    backend: true,
    career: true
  }
});

const coachesStore = useCoachesStore();

const hasCoaches = computed(() => !isLoading.value && coachesStore.hasCoaches);
const filteredCoaches = computed(() => {
  return coachesStore.getCoaches(data.filters)
})

const updateFiltersHandler = (filters: {[key: string]: boolean}) => {
  data.filters = filters;
}

const isCoach = computed(() => coachesStore.isCoach);

const loadCoaches = async () => {
  isLoading.value = true;
  try {
    await coachesStore.loadAndSetCoaches();
  } catch (e) {
    error.value = (e as Error).message || 'Something went wrong!';
  }

  isLoading.value = false;
}

const onErrorClose = () => error.value = null

onMounted(() => {
  loadCoaches();
});

</script>

<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="onErrorClose">
    <p>{{ error }}</p>
  </base-dialog>
  <base-container>
    <section>
      <coach-filter @update="updateFiltersHandler"/>
    </section>
    <section>
      <base-box class="mt-5 has-background-grey-lighter">
        <div class="buttons is-justify-content-space-between">
          <base-button mode="" @click.prevent="loadCoaches">Refresh</base-button>
          <base-button v-if="!isCoach && !isLoading" link class="button" to="/register">Register as a coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner/>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"/>
        </ul>
        <div v-else>
          <h2 class="title">No coaches found</h2>
        </div>
      </base-box>
    </section>
  </base-container>
</template>

<style scoped>

</style>
