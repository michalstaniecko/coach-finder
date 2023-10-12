<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRequestsStore, useUserStore} from "@/stores";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const requestsStore = useRequestsStore();
const userStore = useUserStore();

const isLoading = ref(false);
const error = ref<string | null>();
const data = reactive<any>({
  email: {
    val: userStore.getEmail,
    isValid: true
  },
  message: {
    val: '',
    isValid: true
  },
  firstName: {
    val: '',
    isValid: true
  },
  formIsValid: true
});
const resetValidation = (input: string) => {
  data[input].isValid = true;
}
const validateForm = () => {
  data.formIsValid = true;

  if (data.email.val === '' || !data.email!.val!.includes('@')) {
    data.email.isValid = false;
    data.formIsValid = false;
  }
  if (data.firstName.val === '') {
    data.firstName.isValid = false;
    data.formIsValid = false;
  }
  if (data.message.val === '') {
    data.message.isValid = false;
    data.formIsValid = false;
  }
}

const submitHandler = async () => {
  validateForm();

  if (!data.formIsValid) return;

  isLoading.value = true;

  const coachId: string = route.params.id.toString();

  try {
    await requestsStore.addRequest({
      email: data.email.val,
      firstName: data.firstName.val,
      message: data.message.val,
      coachId: coachId
    });
    router.push('/coaches');
  } catch (e) {
    error.value = (e as Error).message || 'Something went wrong';
  }

  isLoading.value = false;
}

const onClose = () => error.value = null;
</script>

<template>
  <div>
    <base-dialog :show="!!error && !isLoading" title="An error occurred!" @close="onClose">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <base-spinner v-if="isLoading"/>
    <form v-else class="py-5" @submit.prevent="submitHandler" novalidate>
      <div class="field">
        <label class="label" for="email">Email address</label>
        <div class="control">
          <input
              class="input"
              @blur="resetValidation('email')"
              :class="{'is-danger': !data.email.isValid}"
              v-model.trim="data.email.val"
              type="email"
              id="email"
              placeholder="Email"
              readonly
              disabled
          />
        </div>
        <p class="help is-danger" v-if="!data.email.isValid">Invalid email address!</p>
      </div>

      <div class="field">
        <label class="label" for="email">First name</label>
        <div class="control">
          <input
              class="input"
              @blur="resetValidation('firstName')"
              :class="{'is-danger': !data.firstName.isValid}"
              v-model.trim="data.firstName.val"
              type="text"
              id="firts-name"
              placeholder="First name"
          />
        </div>
        <p class="help is-danger" v-if="!data.firstName.isValid">First name must not be empty!</p>
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
  </div>
</template>

<style scoped>

</style>
