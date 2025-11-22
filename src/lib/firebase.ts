import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBQZqxglH9DDJ4IxdJYDp5MueZdWF2fEoU",
    authDomain: "barbar-shop-3f360.firebaseapp.com",
    projectId: "barbar-shop-3f360",
    storageBucket: "barbar-shop-3f360.firebasestorage.app",
    messagingSenderId: "37546517172",
    appId: "1:37546517172:web:df4637e338a923a6c72de1",
    measurementId: "G-QF7RHE28ZY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, storage, analytics };
