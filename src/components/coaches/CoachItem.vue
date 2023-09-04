<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import type {CoachInfo} from "@/stores/coaches/interfaces";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseBadgeList from "@/components/ui/BaseBadgeList.vue";

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
  <li>
    <base-box>
      <h3 class="title">{{ fullName }}</h3>
      <h4 class="subtitle">${{ rate }}/hour</h4>
      <base-badge-list class="mb-3">
        <base-badge v-for="area in areas" :key="area" :title="area" :type="area" />
      </base-badge-list>
      <div class="buttons is-justify-content-flex-end">
        <base-button link :to="contactLink" class="is-outlined is-small">Contact</base-button>
        <base-button link :to="detailsLink" class="is-link is-small">View Details</base-button>
      </div>
    </base-box>
  </li>
</template>

<style scoped>
  li {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>
