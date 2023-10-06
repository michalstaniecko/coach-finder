<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  message: string,
  email: string,
  firstName?: string
}>();

const emailLink = computed(() => `mailto:${props.email}`);
const isFirstName = computed(() => !!props.firstName);
</script>

<template>
  <li>
    <base-box class="mb-3">
      <div v-if="isFirstName" class="subtitle">
        {{ firstName }}
      </div>
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
