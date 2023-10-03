import {defineStore} from "pinia";
import type State from "@/stores/user/interfaces";

import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';

import type {UserCredential} from 'firebase/auth';

import {auth} from "@/js/firebase";

export const useUserStore = defineStore('user', {
    state: (): State => ({
        id: 'c1'
    }),
    getters: {
        getCurrentUserId(): string {
            return this.id;
        }
    },
    actions: {
        login() {

        },
        signup({email, password}: { email: string, password: string }) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: UserCredential) => {
                    const user = userCredential.user;
                    console.log('user created', user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                })
        }
    }
})
