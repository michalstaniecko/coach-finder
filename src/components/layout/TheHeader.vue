<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="navbar is-primary">
      <h1 class="navbar-brand"><router-link   class="navbar-item" to="/">Find a Coach</router-link></h1>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" active-class="is-active" to="/coaches">All Coaches</router-link>
          <router-link class="navbar-item" active-class="is-active" to="/requests">Requests</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
