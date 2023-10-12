import type State from "@/stores/coaches/interfaces";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

export default {
    getCoaches: (state: State) => {
        return (filters?: any) => {
            if (!filters) {
                return state.coaches;
            }
            const filteredCoaches = state.coaches.filter(coach => {
                return coach.areas.some(area => filters[area] === true);
            });
            return filteredCoaches;
        };
    },

    getCoachById:
        (state: State) => (id: string) =>
            state.coaches.find(coach => coach.id === id),

    hasCoaches(state: State) {
        return state.coaches && state.coaches.length > 0;
    },

    isCoach(state: State) {
        const userStore = useUserStore();
        const coaches = state.coaches;
        const userStoreRef = storeToRefs(userStore);
        const currentUserId = userStoreRef.getCurrentUserId;
        return coaches.some(coach => {
            return coach.id === currentUserId.value
        });
    }
}
