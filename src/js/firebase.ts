import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCyfiEv3A8wvXIcW-5--VrAI85-tIMQRO4",
    authDomain: "coach-finder-7aeb3.firebaseapp.com",
    databaseURL: "https://coach-finder-7aeb3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "coach-finder-7aeb3",
    storageBucket: "coach-finder-7aeb3.appspot.com",
    messagingSenderId: "380182393502",
    appId: "1:380182393502:web:5a2deb46e01aa89260018f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

async function getIsAuth(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(!!user);
        }, reject);
    });
}

export {auth, db, getIsAuth};
