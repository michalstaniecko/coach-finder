import type State from "@/stores/coaches/interfaces";


export default {
    getCoaches: (state: State) => {
        return state.coaches;
    },

    getCoachById:
        (state: State) => (id: string) =>
            state.coaches.find(coach => coach.id === id),

    hasCoaches(state: State) {
        return state.coaches && state.coaches.length > 0;
    }
}
