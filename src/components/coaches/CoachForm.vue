<script setup lang="ts">

import {reactive, defineEmits} from "vue";

const emit = defineEmits<{
  (e: 'save-data', value: object): void
}>();

const data = reactive({
  firstName: {
    val: '',
    isValid: true
  },
  lastName: {
    val: '',
    isValid: true
  },
  description: {
    val: '',
    isValid: true
  },
  rate: {
    val: null,
    isValid: true
  },
  areas: {
    val: [],
    isValid: true
  },
  formIsValid: true
});

const resetValidation = (input) => {
  data[input].isValid = true;
}

const validateForm = () => {
  data.formIsValid = true;

  if (data.firstName.val === '') {
    data.firstName.isValid = false;
    data.formIsValid = false;
  }
  if (data.lastName.val === '') {
    data.lastName.isValid = false;
    data.formIsValid = false;
  }
  if (data.description.val === '') {
    data.description.isValid = false;
    data.formIsValid = false;
  }
  if (!data.rate.val || Number(data.rate.val) < 0) {
    data.rate.isValid = false;
    data.formIsValid = false;
  }
  if (data.areas.val.length === 0) {
    data.areas.isValid = false;
    data.formIsValid = false;
  }
}

const submitHandler = () => {
  validateForm();

  if (!data.formIsValid) {
    return;
  }

  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    description: data.description,
    hourlyRate: data.rate,
    areas: data.areas
  }

  emit('save-data', formData);
}

</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="field" >
      <label class="label" for="firstname">First Name</label>
      <div class="control">
        <input
            class="input"
            @blur="resetValidation('firstName')"
            :class="{'is-danger': !data.firstName.isValid}"
            v-model.trim="data.firstName.val"
            type="text"
            id="firstname"
            placeholder="First name"
        />
      </div>
      <p class="help is-danger" v-if="!data.firstName.isValid">First Name must not be empty!</p>
    </div>
    <div class="field">
      <label class="label" for="firstname">Last Name</label>
      <div class="control">
        <input
            @blur="resetValidation('lastName')"
            class="input"
            :class="{'is-danger': !data.lastName.isValid}"
            v-model.trim="data.lastName.val"
            type="text"
            id="lastname"
            placeholder="Last name"
        />
      </div>
      <p class="help is-danger" v-if="!data.lastName.isValid">Last Name must not be empty!</p>
    </div>
    <div class="field">
      <label class="label" for="description">Description</label>
      <div class="control">
        <textarea
            @blur="resetValidation('description')"
            :class="{'is-danger': !data.description.isValid}"
            class="textarea" v-model.trim="data.description.val" id="description" placeholder="Description"
        ></textarea>
      </div>
      <p class="help is-danger" v-if="!data.description.isValid">Description must not be empty!</p>
    </div>
    <div class="field">
      <label class="label" for="rate">Hourly rate</label>
      <div class="control">
        <input
            @blur="resetValidation('rate')"
            :class="{'is-danger': !data.rate.isValid}"
            class="input"
            v-model.number="data.rate.val"
            type="number"
            id="rate"
            placeholder="Hourly rate"/>
      </div>
      <p class="help is-danger" v-if="!data.rate.isValid">Rate must not be empty!</p>
    </div>
    <div class="field">
      <div class="is-grouped">
        <p class="control">
          <label class="checkbox">
            <input type="checkbox"
                   @change="resetValidation('areas')" v-model="data.areas.val" id="frontend" value="frontend"/>
            Frontend
          </label>
        </p>
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" @change="resetValidation('areas')" v-model="data.areas.val" id="backend" value="backend"/>
            Backend
          </label>
        </p>
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" @change="resetValidation('areas')" v-model="data.areas.val" id="career" value="career"/>
            Career
          </label>
        </p>
      </div>
      <p class="help is-danger" v-if="!data.areas.isValid">Areas must not be empty!</p>
    </div>
    <div>
      <p v-if="!data.formIsValid">
        Please fix the above errors and submit again.
      </p>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<style scoped>

</style>
