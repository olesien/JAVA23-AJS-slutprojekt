import { initializeApp } from "firebase/app";
import "dotenv/config";

export const firebaseConfig = {
    databaseURL: process.env.FIREBASE_DATABASEURL,
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
    appId: process.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

export { app };
