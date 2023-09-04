<script setup lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import {computed} from "vue";
import {useCoachesStore} from "@/stores";

const coachesStore = useCoachesStore();

const hasCoaches = computed(() => coachesStore.hasCoaches);
const filteredCoaches = computed(() => coachesStore.getCoaches)


</script>

<template>
  <section>
    FILTER
  </section>
  <section>
    <div>Refresh</div>
    <div><router-link to="/register">Register as a coach</router-link></div>
    <div class="columns" v-if="hasCoaches">
      <ul  class="mt-5 column is-three-quarters-tablet is-half-desktop">
        <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
      </ul>
    </div>
    <div v-else>
      <h2 class="title">No coaches found</h2>
    </div>
  </section>
</template>

<style scoped>

</style>
