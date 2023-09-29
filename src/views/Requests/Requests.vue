<script setup lang="ts">
import {useRequestsStore} from "@/stores";
import RequestItem from "@/components/requests/RequestItem.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const requestsStore = useRequestsStore();

const requests = requestsStore.getRequests;

const hasRequests = requestsStore.hasRequests;
</script>

<template>
  <section>
    <base-container>
      <base-box class="has-background-grey-lighter">
        <h2 class="title mb-6">Requests Received</h2>
        <ul v-if="hasRequests">
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
</template>
