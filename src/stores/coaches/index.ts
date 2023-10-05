import {defineStore} from "pinia";
import getters from './getters';
import type State from "@/stores/coaches/interfaces";
import type {CoachInfo} from "@/stores/coaches/interfaces";
import type {CoachFormInfo} from "@/stores/coaches/interfaces";
import {useUserStore} from "@/stores/user";
import axios from "axios";
import database from "@/database";
import type {AxiosError} from "axios";

import {ref, set, onValue} from 'firebase/database';
import {db} from '@/js/firebase';

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

            const coachesRef = ref(db, `coaches/${userId}`);

            try {
                await set(coachesRef, coachData);
            } catch (error) {
                console.log('add coach', error);
            }

            this.coaches.push({
                ...coachData,
                id: userId
            })
        },

        async loadAndSetCoaches(forceRefresh = false) {

            const coaches: CoachInfo[] = [];
            const coachesRef = ref(db, 'coaches');
            const unsubscribe = onValue(coachesRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    coaches.push(
                        {
                            ...doc.val(),
                            id: doc.key
                        }
                    );
                });
                this.coaches = coaches;
            });

        },
        setFetchTimestamp() {
            this.lastFetch = new Date().getTime();
        }
    }
});
