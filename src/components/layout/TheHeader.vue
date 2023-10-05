<script setup lang="ts">
import {useUserStore} from "@/stores";
import {computed} from "vue";

const userStore = useUserStore();

const isLogged = computed(() => userStore.isLogged);

const logout = () => {
  userStore.logout();
}

</script>

<template>
  <header>
    <nav class="navbar is-primary">
      <h1 class="navbar-brand">
        <router-link class="navbar-item" to="/">Find a Coach</router-link>
      </h1>
      <div class="navbar-menu">
        <div class="navbar-end is-align-items-center">
          <router-link class="navbar-item" active-class="is-active" to="/coaches">All Coaches</router-link>
          <router-link class="navbar-item" active-class="is-active" to="/requests">Requests</router-link>
          <base-button v-if="isLogged" type="button" @click.prevent="logout">Logout</base-button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
