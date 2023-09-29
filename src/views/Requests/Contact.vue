<script setup lang="ts">
import {reactive} from "vue";
import {useRequestsStore} from "@/stores";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const requestsStore = useRequestsStore();

const data = reactive({
  email: {
    val: '',
    isValid: true
  },
  message: {
    val: '',
    isValid: true
  },
  formIsValid: true
});
const resetValidation = (input) => {
  data[input].isValid = true;
}
const validateForm = () => {
  data.formIsValid = true;

  if (data.email.val === '' || !data.email.val.includes('@')) {
    data.email.isValid = false;
    data.formIsValid = false;
  }
  if (data.message.val === '') {
    data.message.isValid = false;
    data.formIsValid = false;
  }
}

const submitHandler = () => {
  validateForm();

  if (!data.formIsValid) return;

  const coachId: string = route.params.id.toString();

  requestsStore.addRequest({
    email: data.email.val,
    message: data.message.val,
    coachId: coachId
  });

  router.push('/coaches');

}
</script>

<template>
  <form class="py-5" @submit.prevent="submitHandler" novalidate>
    <div class="field">
      <label class="label" for="email">First Name</label>
      <div class="control">
        <input
            class="input"
            @blur="resetValidation('email')"
            :class="{'is-danger': !data.email.isValid}"
            v-model.trim="data.email.val"
            type="email"
            id="email"
            placeholder="Email"
        />
      </div>
      <p class="help is-danger" v-if="!data.email.isValid">Invalid email address!</p>
    </div>

    <div class="field">
      <label class="label" for="message">Message</label>
      <div class="control">
        <textarea
            class="textarea"
            @blur="resetValidation('message')"
            :class="{'is-danger': !data.message.isValid}"
            v-model.trim="data.message.val"
            id="message"
            placeholder="Message"
        ></textarea>
      </div>
      <p class="help is-danger" v-if="!data.message.isValid">Message must not be empty!</p>
    </div>
    <p v-if="!data.formIsValid" class="help has-text-danger py-2">
      Please fix the above errors and submit again.
    </p>
    <div>
      <base-button class="is-primary">Send message</base-button>
    </div>
  </form>
</template>

<style scoped>

</style>
