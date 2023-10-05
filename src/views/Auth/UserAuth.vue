<script setup lang="ts">
import {useUserStore} from "@/stores";
import {computed, ref} from "vue";

const userStore = useUserStore();

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');
const isLoading = ref(false);
const error = ref<string>('');

const submitForm = async () => {
  formIsValid.value = true;
  error.value = '';

  if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false;
    return;
  }

  isLoading.value = true;

  if (mode.value === 'signup') {
    try {
      await userStore.signup({
        email: email.value,
        password: password.value
      });
    } catch (e) {
      error.value = (e as string);
    }

  }

  if (mode.value === 'login') {
    try {
      await userStore.login({
        email: email.value,
        password: password.value
      });
    } catch (e) {
      error.value = (e as string);
    }
  }
  isLoading.value = false;
}

const switchAuthMode = (value: string) => mode.value = value

const switchButtonMode = (value: string) => `${mode.value !== value && 'is-outlined'} is-primary`;

const errorMessage = computed(() => {
  if (!error.value) return null;

  const errors: { [key: string]: string } = {
    'auth/invalid-login-credentials': 'Invalid login credentials',
    'auth/email-already-in-use': 'Email already in use'
  }
  return errors[error.value] || error.value;
})

</script>

<template>
  <base-container>
    <div class="buttons">
      <base-button type="button" :mode="switchButtonMode('login')" @click="switchAuthMode('login')">Login</base-button>
      <base-button type="button" :mode="switchButtonMode('signup')" @click="switchAuthMode('signup')">Sign up
      </base-button>
    </div>
    <div v-if="isLoading">
      <base-spinner/>
    </div>
    <form @submit.prevent="submitForm" v-else>
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
      <div v-if="!isLoading && error" class="notification">
        {{ errorMessage }}
      </div>
      <div class="field">
        <p class="control">
          <base-button type="button" mode="is-primary mr-3" @click.prevent="submitForm">Submit</base-button>
        </p>
      </div>
    </form>
  </base-container>
</template>

<style scoped>

</style>
