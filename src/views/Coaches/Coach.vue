<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useCoachesStore} from "@/stores";

const route = useRoute();

const props = defineProps<{
  id: string
}>()

const coachesStore = useCoachesStore();

const {firstName, lastName, hourlyRate, areas, description } = coachesStore.getCoachById('c1');

const rate = computed(() => {
  return `$${hourlyRate}/hour`;
})

const fullName = computed(() => `${firstName} ${lastName}`);

const contactLink = computed(() => `${route.path}/contact`);

</script>

<template>
  <section>
    <base-box>
      <h2 class="title">{{ fullName }}</h2>
      <h3 class="subtitle">{{ rate }}</h3>
    </base-box>
  </section>
  <section>
    <base-box>
      <header>
        <h2 class="subtitle">Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-box>
  </section>
  <section>
    <base-box>
      <base-badge-list>
        <base-badge v-for="area in areas" :key="area" :title="area" :type="area"/>
      </base-badge-list>
      <p>{{ description }}</p>
    </base-box>
  </section>
</template>

<style scoped>

</style>
