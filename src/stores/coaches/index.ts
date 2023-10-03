import {defineStore} from "pinia";
import getters from './getters';
import type State from "@/stores/coaches/interfaces";
import type {CoachInfo} from "@/stores/coaches/interfaces";
import type {CoachFormInfo} from "@/stores/coaches/interfaces";
import {useUserStore} from "@/stores/user";
import axios from "axios";
import database from "@/database";
import type {AxiosError} from "axios";

export const useCoachesStore = defineStore('coaches', {
    state: (): State => ({
        lastFetch: null,
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
        async addCoach(payload: CoachFormInfo) {
            const userStore = useUserStore();
            const userId = userStore.getCurrentUserId;
            const coachData: CoachInfo = {
                firstName: payload.firstName.val,
                lastName: payload.lastName.val,
                areas: payload.areas.val,
                description: payload.description.val,
                hourlyRate: payload.hourlyRate.val
            }

            const response = await axios.put(`${database.url}/coaches/${userId}.json`, {
                ...coachData
            });

            if (response.status !== 200) {
                // error
            }

            this.coaches.push({
                ...coachData,
                id: userId
            })
        },

        async loadCoaches() {
            try {
                return await axios.get(`${database.url}/coaches.json`);
            } catch (error) {
                throw new Error((error as AxiosError).message);
            }
        },

        async loadAndSetCoaches(forceRefresh = false) {
            if (!forceRefresh && !this.shouldUpdate) return;

            const response = await this.loadCoaches();

            if (response.status !== 200) {
                const error = new Error(response.statusText || 'Failed to fetch');
                throw error;
            }

            const responseData = response.data;

            const coaches = Object.keys(responseData).map(key => ({
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate
            }));

            this.coaches = coaches;
            this.setFetchTimestamp();
        },
        setFetchTimestamp() {
            this.lastFetch = new Date().getTime();
        }
    }
});
