<script setup lang="ts">

import {reactive} from "vue";

const data = reactive({
  firstName: '',
  lastName: '',
  description: '',
  rate: null,
  areas: []
});

const submitHandler = () => {
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    description: data.description,
    rate: data.rate,
    areas: data.areas
  }

  console.log(formData);
}

</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="field">
      <label class="label" for="firstname">First Name</label>
      <div class="control">
        <input class="input" v-model.trim="data.firstName" type="text" id="firstname" placeholder="First name"/>
      </div>
    </div>
    <div class="field">
      <label class="label" for="firstname">Last Name</label>
      <div class="control">
        <input class="input" v-model.trim="data.lastName" type="text" id="lastname" placeholder="Last name"/>
      </div>
    </div>
    <div class="field">
      <label class="label" for="description">Description</label>
      <div class="control">
        <textarea class="textarea" v-model.trim="data.description" id="description" placeholder="Description"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label" for="rate">Hourly rate</label>
      <div class="control">
        <input class="input" v-model.number="data.rate" type="number" id="rate" placeholder="Hourly rate"/>
      </div>
    </div>
    <div class="field is-grouped">
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="data.areas" id="frontend" value="frontend"/>
          Frontend
        </label>
      </p>
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="data.areas" id="backend" value="backend"/>
          Backend
        </label>
      </p>
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="data.areas" id="career" value="career"/>
          Career
        </label>
      </p>
    </div>
    <div>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<style scoped>

</style>
