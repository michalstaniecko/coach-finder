import {defineStore} from "pinia";
import type State from "@/stores/requests/interfaces";
import type {RequestInfo, RequestFormInfo} from "@/stores/requests/interfaces";
import {useUserStore} from "@/stores";
import axios from "axios";
import database from "@/database";
import type {AxiosError} from "axios";
import {onValue, set, ref} from "firebase/database";
import {db} from '@/js/firebase';

export const useRequestsStore = defineStore('requests', {
    state: (): State => ({
        requests: [],
        unsubscribeSnapshot: null
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
        async storeMessage(endpoint: string, data: any) {
            try {
                return await axios.post(`${database.url}/${endpoint}`, data)
            } catch (error) {
                throw new Error((error as AxiosError).message);
            }
        },
        async loadRequests(id: string) {
            try {
                return await axios.get(`${database.url}/requests/${id}.json`)
            } catch (error) {
                throw new Error((error as AxiosError).message);
            }
        },
        async addRequest(request: RequestFormInfo) {
            const newRequest = {
                userEmail: request.email,
                message: request.message,
                firstName: request.firstName
            }
            const response = await this.storeMessage(`requests/${request.coachId}.json`, newRequest);

            const responseData = response.data;

            this.requests.push({
                ...newRequest,
                coachId: request.coachId,
                id: responseData.name
            });
        },
        async fetchRequests() {
            const userStore = useUserStore();
            const coachId = userStore.getCurrentUserId;
            const requests: RequestInfo[] = [];

            if (!coachId) return;

            const requestsRef = ref(db, `requests/${coachId}`);

            this.unsubscribeSnapshot = onValue(requestsRef, (snapshot) => {
                snapshot.forEach(doc => {
                    requests.push({
                        id: doc.key,
                        coachId: coachId,
                        ...doc.val()
                    })
                })
                this.requests = requests;
            });
        },

        clearRequests() {
            this.requests = [];
            if (this.unsubscribeSnapshot) this.unsubscribeSnapshot();
        }
    }
})
