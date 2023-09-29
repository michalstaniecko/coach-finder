import {defineStore} from "pinia";
import type State from "@/stores/requests/interfaces";
import type {RequestInfo, RequestFormInfo} from "@/stores/requests/interfaces";

export const useRequestsStore = defineStore('requests', {
    state: (): State => ({
        requests: []
    }),
    getters: {
        getRequests(): RequestInfo[] {
            return this.requests;
        },
        hasRequests(): boolean {
            return this.requests && this.requests.length > 0;
        }
    },
    actions: {
        addRequest(request: RequestFormInfo) {
            const newRequest = {
                id: new Date().toISOString(),
                coachId: request.coachId,
                userEmail: request.email,
                message: request.message
            }
            this.requests.push(newRequest);
        }
    }
})
