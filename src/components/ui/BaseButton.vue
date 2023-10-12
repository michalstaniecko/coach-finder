<script setup lang="ts">
import {computed} from "vue";
import type {RouteLocationRaw} from "vue-router";

const props = withDefaults(defineProps<{
  link?: boolean | false,
  to?: RouteLocationRaw,
  mode?: string | null,
  disabled?: boolean
}>(), {
  disabled: false
})

const isDisabled = computed(() => props.disabled);

const path = computed(() => props.to ?? '/')
</script>

<template>
  <button
      v-if="!link"
      :class="['button', mode]"
      :disabled="isDisabled"
  >
    <slot></slot>
  </button>
  <router-link
      v-else
      :to="path"
      :class="['button', mode, {'is-disable': isDisabled}]"
  >
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
