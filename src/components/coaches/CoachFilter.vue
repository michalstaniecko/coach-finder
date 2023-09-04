<script setup lang="ts">
import {reactive, defineEmits} from "vue";

const emit = defineEmits<{
  (e: 'update', value: object): void
}>();

const data = reactive({
  filters: {
    frontend: true,
    backend: true,
    career: true
  }
});

const setFilter = (event) => {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  const updatedFilters = {
    ...data.filters,
    [inputId]: isActive
  }
  data.filters = updatedFilters
  emit('update', data.filters);
}
</script>

<template>
  <base-box>
    <h2 class="title">Find your Coach</h2>
    <div class="field is-grouped">
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" id="frontend" checked @change="setFilter"/>
          Frontend
        </label>
      </p>
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" id="backend" checked @change="setFilter"/>
          Backend
        </label>
      </p>
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" id="career" checked @change="setFilter"/>
          Career
        </label>
      </p>
    </div>
  </base-box>
</template>

<style scoped>

</style>
