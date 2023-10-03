<script setup lang="ts">
import {useRequestsStore} from "@/stores";
import RequestItem from "@/components/requests/RequestItem.vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";

const isLoading = ref(false);
const error = ref<string | null>();

const requestsStore = useRequestsStore();

const {requests, hasRequests} = storeToRefs(requestsStore);

const loadRequests = async () => {
  isLoading.value = true;
  try {
    await requestsStore.fetchRequests();
  } catch (e) {
    error.value = (e as Error).message || 'Something went wrong';
  }
  isLoading.value = false;
}

const onClose = () => error.value = null;

onMounted(() => {
  loadRequests();
})

</script>

<template>
  <div>
    <base-dialog :show="!!error && !isLoading" title="An error occurred!" @close="onClose">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-container>
        <base-box class="has-background-grey-lighter">
          <h2 class="title mb-6">Requests Received</h2>
          <base-spinner v-if="isLoading"/>
          <ul v-else-if="hasRequests">
            <request-item
                v-for="(request) in requests"
                :message="request.message"
                :email="request.userEmail"
                :key="request.id"
            />
          </ul>
          <h3
              v-else
              class="subtitle"
          >You haven't received any requests yet!</h3>
        </base-box>
      </base-container>
    </section>
  </div>
</template>
