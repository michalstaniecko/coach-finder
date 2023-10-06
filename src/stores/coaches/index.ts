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
        coaches: [],
        isLoading: true
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

        async loadAndSetCoaches() {

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
                this.isLoading = false;
            });

        },
        setFetchTimestamp() {
            this.lastFetch = new Date().getTime();
        }
    }
});
