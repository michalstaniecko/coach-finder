<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
    title: string,
    type: 'frontend' | 'backend' | 'career'
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
