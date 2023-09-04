<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import type {CoachInfo} from "@/stores/coaches/interfaces";

const props = defineProps<{
  coach?: CoachInfo
}>()

const {path} = useRoute();

const {firstName, lastName, hourlyRate: rate, areas, id} = props.coach;

const fullName = computed(() => `${firstName} ${lastName}`);

const contactLink = computed(() => `${path}/${id}/contact`);
const detailsLink = computed(() => `${path}/${id}`)
</script>

<template>
  <li class="box">
    <div class="">
      <h3 class="title">{{ fullName }}</h3>
      <h4 class="subtitle">${{ rate }}/hour</h4>
      <div class="mb-3">
        <span class="tag mr-2" v-for="area in areas" :key="area">{{ area }}</span>
      </div>
      <div class="buttons is-justify-content-flex-end">
        <router-link :to="contactLink" class="button is-primary is-small">Contact</router-link>
        <router-link :to="detailsLink" class="button is-link is-small">View Details</router-link>
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>
