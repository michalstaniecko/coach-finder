<script setup lang="ts">
import {computed} from "vue";

export interface Props {
  show?: boolean
  title?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false
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
    <div class="modal-background" v-if="show"></div>
    <transition name="dialog">
    <div class="modal is-active" v-if="show">
        <div class="modal-card" >
          <header class="modal-card-head" >
            <p class="modal-card-title"  >{{ title }}</p>
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
    </transition>
  </teleport>
</template>

<style>
.modal-background {
  z-index: 40;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>
