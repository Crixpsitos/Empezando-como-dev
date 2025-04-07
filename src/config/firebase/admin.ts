
import admin from "firebase-admin";
import firebaseCredentials from "../../empezando-como-dev-firebase-adminsdk-fbsvc-7e94331cf0.json" assert { type: "json" };


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseCredentials as admin.ServiceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}



export const db = admin.firestore()