<script setup lang="ts">

import {ref} from "vue";

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');

const submitForm = () => {
  formIsValid.value = true;
  if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false;
    return;
  }
}

const switchAuthMode = (value: string) => mode.value = value

const switchButtonMode = (value:string) => `${mode.value !== value && 'is-outlined'} is-primary`

</script>

<template>
  <base-container>
    <div class="buttons">
      <base-button type="button" :mode="switchButtonMode('login')" @click="switchAuthMode('login')">Login</base-button>
      <base-button type="button" :mode="switchButtonMode('signup')" @click="switchAuthMode('signup')">Sign up</base-button>
    </div>
    <form @submit.prevent="submitForm">
      <div class="field">
        <p class="control has-icons-left ">
          <input class="input" v-model.trim="email" type="email" placeholder="Email">
          <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" v-model.trim="password" type="password" placeholder="Password">
          <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
        </p>
      </div>
      <div class="has-text-danger has-background-danger-light notification" v-if="!formIsValid">
        Please enter a valid email address and password (must be at least 6 characters long)
      </div>
      <div class="field">
        <p class="control">
          <base-button type="button" mode="is-primary mr-3" @click.prevent="submitForm" >Submit</base-button>
        </p>
      </div>
    </form>
  </base-container>
</template>

<style scoped>

</style>
