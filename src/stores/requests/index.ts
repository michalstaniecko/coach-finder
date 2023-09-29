import {defineStore} from "pinia";
import type State from "@/stores/requests/interfaces";
import type {RequestInfo, RequestFormInfo} from "@/stores/requests/interfaces";
import {useUserStore} from "@/stores";

export const useRequestsStore = defineStore('requests', {
    state: (): State => ({
        requests: []
    }),
    getters: {
        getRequests(): RequestInfo[] {
            const userStore = useUserStore();
            const coachId = userStore.getCurrentUserId;
            return this.requests.filter(req => req.coachId === coachId);
        },
        hasRequests(): boolean {
            return this.getRequests && this.getRequests.length > 0;
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
