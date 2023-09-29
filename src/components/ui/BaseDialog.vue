<script setup lang="ts">
export interface Props {
  show?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: 'fas'
});

const emit = defineEmits<{
  close: []
}>()


const closeModal = () => {
  emit('close');
}

</script>

<template>
  <teleport to="body">
    <div class="modal is-active" v-if="show">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" @click.prevent="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click.prevent="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<style scoped>

</style>
