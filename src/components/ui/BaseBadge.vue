<script setup lang="ts">
import {computed} from "vue";
import type {CoachAreaInfo} from "@/stores/coaches/interfaces";

const props = defineProps<{
    title: string,
    type: CoachAreaInfo
  }>()

const typeClass = computed(() => {
  const classes = {
    frontend: 'is-info',
    backend: 'is-success',
    career: 'is-warning'
  }

  return classes[props.type];
})

</script>

<template>
  <span class="tag is-light" :class="typeClass">
    {{ title }}
  </span>
</template>

<style scoped>
  span {
    text-transform: uppercase;
  }
</style>
