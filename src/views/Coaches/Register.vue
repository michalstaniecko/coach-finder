<script setup lang="ts">
import CoachForm from "@/components/coaches/CoachForm.vue";
import {useRouter} from "vue-router";
import {useCoachesStore} from "@/stores";

const coachStore = useCoachesStore();

const router = useRouter();

const saveDataHandler = (formData: any) => {
  coachStore.addCoach(formData);
  router.push('/coaches');
}
</script>

<template>
  <base-container>
    <base-box>
      <h2 class="title">Register as a coach now!</h2>
      <coach-form @save-data="saveDataHandler"/>
    </base-box>
  </base-container>
</template>

<style scoped>

</style>
