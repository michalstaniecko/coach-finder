<script setup lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import {computed, reactive, onMounted, ref} from "vue";
import {useCoachesStore, useUserStore} from "@/stores";

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
const userStore = useUserStore();

const hasCoaches = computed(() => !isLoading.value && coachesStore.hasCoaches);
const filteredCoaches = computed(() => {
  return coachesStore.getCoaches(data.filters)
})

const updateFiltersHandler = (filters: {[key: string]: boolean}) => {
  data.filters = filters;
}

const isLogged = computed(() => userStore.isLogged);
const isCoach = computed(() => coachesStore.isCoach);
const isLoading = computed(() => coachesStore.isLoading);

const loadCoaches = () => {
  coachesStore.loadAndSetCoaches();
}

const onErrorClose = () => error.value = null

onMounted(() => {
  loadCoaches();
});

</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="onErrorClose" type="danger">
      <p>{{ error }}</p>
    </base-dialog>
    <base-container>
      <section>
        <coach-filter @update="updateFiltersHandler"/>
      </section>
      <section>
        <base-box class="mt-5 has-background-grey-lighter">
          <div class="has-text-right">
            <base-button v-if="!isCoach && !isLoading && isLogged" link class="button" to="/register">Register as a coach</base-button>
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
  </div>
</template>

<style scoped>

</style>
