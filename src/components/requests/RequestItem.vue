<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  message: string,
  email: string
}>();

const emailLink = computed(() => `mailto:${props.email}`)
</script>

<template>
  <li>
    <base-box class="mb-3">
      <div>
        <a :href="emailLink">
          {{ email }}
        </a>
      </div>
      <p>
        {{ message }}
      </p>
    </base-box>
  </li>
</template>

<style scoped>

</style>
