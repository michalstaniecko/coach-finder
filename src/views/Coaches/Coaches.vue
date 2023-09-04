<script setup lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import {computed} from "vue";
import {useCoachesStore} from "@/stores";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const coachesStore = useCoachesStore();

const hasCoaches = computed(() => coachesStore.hasCoaches);
const filteredCoaches = computed(() => coachesStore.getCoaches)


</script>

<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="columns">
      <base-box class="mt-5 column is-three-quarters-tablet is-half-desktop has-background-grey-lighter">
        <div class="buttons is-justify-content-space-between">
          <base-button mode="">Refresh</base-button>
          <base-button link class="button" to="/register">Register as a coach</base-button>
        </div>
        <ul  v-if="hasCoaches">
          <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"/>
        </ul>
        <div v-else>
          <h2 class="title">No coaches found</h2>
        </div>
      </base-box>
    </div>
  </section>
</template>

<style scoped>

</style>
