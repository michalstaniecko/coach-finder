import {defineStore} from "pinia";
import type State from "@/stores/user/interfaces";

export const useUserStore = defineStore('user', {
    state: (): State => ({
        id: 'c3'
    }),
    getters: {
        getCurrentUserId(): string {
            return this.id;
        }
    }
})
