<script setup lang="ts">
import {useUserStore, useCoachesStore} from "@/stores";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const userStore = useUserStore();
const coachesStore = useCoachesStore();

const isLogout = ref(false);

const {isLogged} = storeToRefs(userStore);

const logout = async () => {
  isLogout.value = await userStore.logout();
}

const coachesStoreRef = storeToRefs(coachesStore);
const isCoach = coachesStoreRef.isCoach;

const closeHandler = () => isLogout.value = false

</script>

<template>
  <header>
    <base-dialog :show="isLogout" title="Logout" @close="closeHandler">
      <p>
        User has been logout.
      </p>
    </base-dialog>
    <nav class="navbar is-primary">
      <h1 class="navbar-brand">
        <router-link class="navbar-item" to="/">Find a Coach</router-link>
      </h1>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" active-class="is-active" to="/coaches">All Coaches</router-link>
          <router-link v-if="isLogged && isCoach" class="navbar-item" active-class="is-active" to="/requests">Requests
          </router-link>
          <div class="navbar-item">
            <base-button v-if="isLogged" type="button" @click.prevent="logout">Logout</base-button>
            <base-button :link="true" to="/auth" v-else>Login</base-button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
