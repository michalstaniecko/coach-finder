import type State from "@/stores/coaches/interfaces";


export default {
    getCoaches: (state: State) => {
        return state.coaches;
    },

    hasCoaches(state: State) {
        return state.coaches && state.coaches.length > 0;
    }
}
