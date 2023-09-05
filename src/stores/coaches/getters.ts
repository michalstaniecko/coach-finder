import type State from "@/stores/coaches/interfaces";
import {useUserStore} from "@/stores/user";

export default {
    getCoaches: (state: State) => {
        return (filters?: any) => {
            if (!filters) {
                return state.coaches;
            }
            const filteredCoaches = state.coaches.filter(coach => {
                return coach.areas.some(area => filters[area] === true);
            })
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
        const currentUserId = userStore.getCurrentUserId;
        return coaches.some(coach => coach.id === currentUserId);
    }
}
