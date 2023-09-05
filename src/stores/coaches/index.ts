import {defineStore} from "pinia";
import getters from './getters';
import type State from "@/stores/coaches/interfaces";
import type {CoachInfo} from "@/stores/coaches/interfaces";
import {useUserStore} from "@/stores/user";

export const useCoachesStore = defineStore('coaches', {
    state: (): State => ({
        coaches: [
            {
                id: 'c1',
                firstName: 'Maximilian',
                lastName: 'Schwarzmüller',
                areas: ['frontend', 'backend', 'career'],
                description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                hourlyRate: 20
            },
            {
                id: 'c2',
                firstName: 'Julie',
                lastName: 'Jones',
                areas: ['frontend', 'career'],
                description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                hourlyRate: 30
            }
        ]
    }),
    getters,
    actions: {
        addCoach(payload: CoachInfo) {
            const userStore = useUserStore();
            const coachData = {
                id: userStore.getCurrentUserId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                areas: payload.areas,
                description: payload.description,
                hourlyRate: payload.hourlyRate
            }
            this.coaches.push(coachData)
        }
    }
});
