import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// You'll n eed to replace this with your actual service account file name
import serviceAccount from "../comp-3018-assignment-4-23385-firebase-adminsdk-fbsvc-1ee3d2ded3.json";

// initialize the Firebase app with our service account key
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// get a reference to firebase authentication
const auth: Auth = getAuth();

// get a reference to the firestore database
const db: Firestore = getFirestore();

export { auth, db };
