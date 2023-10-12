<script setup lang="ts">
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCoachesStore} from "@/stores";

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  id: string
}>();

const coachesStore = useCoachesStore();

const emptyCoach = {firstName: null, lastName: null, hourlyRate: null, areas: null, description: null};

const {firstName, lastName, hourlyRate, areas, description} = coachesStore.getCoachById(props.id) || emptyCoach;

const rate = computed(() => {
  return `$${hourlyRate}/hour`;
})

const fullName = computed(() => `${firstName} ${lastName}`);
const parentRoute = router.resolve({
  name: 'coach',
  params: {id: props.id}
});
const contactLink = computed(() => `${parentRoute.path}/contact`);

</script>

<template>
  <base-container>
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
  </base-container>
</template>

<style scoped>

</style>
