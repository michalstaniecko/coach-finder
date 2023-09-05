<script setup lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import {computed, reactive} from "vue";
import {useCoachesStore} from "@/stores";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const data = reactive({
  filters: {
    frontend: true,
    backend: true,
    career: true
  }
})

const coachesStore = useCoachesStore();

const hasCoaches = computed(() => coachesStore.hasCoaches);
const filteredCoaches = computed(() => {
  return coachesStore.getCoaches(data.filters)
})

const updateFiltersHandler = (filters) => {
  data.filters = filters;
}

const isCoach = computed(() => coachesStore.isCoach);

</script>

<template>
  <base-container>
    <section>
      <coach-filter @update="updateFiltersHandler"/>
    </section>
    <section>
      <base-box class="mt-5 has-background-grey-lighter">
        <div class="buttons is-justify-content-space-between">
          <base-button mode="">Refresh</base-button>
          <base-button v-if="!isCoach" link class="button" to="/register">Register as a coach</base-button>
        </div>
        <ul v-if="hasCoaches">
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
