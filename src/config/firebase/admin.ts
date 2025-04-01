
import admin from "firebase-admin";
import firebaseCredentials from "../../empezando-como-dev-firebase-adminsdk-fbsvc-7e94331cf0.json" assert { type: "json" };


const { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
}

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseCredentials as admin.ServiceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}
export const db = admin.firestore()