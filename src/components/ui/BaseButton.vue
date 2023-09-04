<script setup lang="ts">
const props = defineProps<{
  link?: boolean | false,
  to?: string | false,
  mode?: string | null
}>()
</script>

<template>
  <button
      v-if="!link"
      :class="['button', mode]"
  >
    <slot></slot>
  </button>
  <router-link
      v-else
      :to="to"
      :class="['button', mode]"
  >
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
