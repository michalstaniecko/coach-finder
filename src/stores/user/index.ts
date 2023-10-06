import {defineStore} from "pinia";
import type State from "@/stores/user/interfaces";
import type {UserForm} from "@/stores/user/interfaces";

import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';

import type {UserCredential} from 'firebase/auth';
import type {User} from 'firebase/auth';

import {auth} from "@/js/firebase";
import {useRequestsStore} from "@/stores";

export const useUserStore = defineStore('user', {
    state: (): State => ({
        user: {}
    }),
    getters: {
        getCurrentUserId(): string | undefined {
            return this.user?.id;
        },
        isLogged(): boolean {
            return !!this.user.id;
        },
        getEmail(): string {
            return this.user!.email!;
        }
    },
    actions: {
        init() {
            const requestsStore = useRequestsStore();
            onAuthStateChanged(auth, (user: User | null) => {
                // TODO: should be done something with redirecting
                if (user) {
                    this.user.id = user.uid;
                    this.user.email = user.email;
                    this.router.push('/coaches');
                } else {
                    this.user = {}
                    this.router.push('/auth');
                    requestsStore.clearRequests();
                }
            })
        },
        login({email, password}: UserForm) {
            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential: UserCredential) => {
                        const user = userCredential.user;
                        resolve(true);
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        reject(errorCode);
                    })
            })
        },
        signup({email, password}: UserForm) {
            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential: UserCredential) => {
                        const user = userCredential.user;
                        resolve(true);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        reject(errorCode);
                    })
            })
        }
        ,
        logout() {
            signOut(auth)
                .then(() => {
                })
                .catch((error) => {
                })
        }
    }
})
