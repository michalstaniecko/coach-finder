<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  link?: boolean | false,
  to?: string | null,
  mode?: string | null,
  disabled?: boolean
}>(), {
  disabled: false
})

const isDisabled = computed(() => props.disabled)
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
      :to="to"
      :class="['button', mode, {'is-disable': isDisabled}]"
  >
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
