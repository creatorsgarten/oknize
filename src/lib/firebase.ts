// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAIV4O2ECS_Jb_639yCa9kCGJ1xwf06OZ8',
    authDomain: 'eventkit-ywc.firebaseapp.com',
    projectId: 'eventkit-ywc',
    storageBucket: 'eventkit-ywc.appspot.com',
    messagingSenderId: '1015037171495',
    appId: '1:1015037171495:web:79100b107f5eae245e3b02',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);

const globalState = globalThis as unknown as {
    __firebaseInitialized?: boolean;
};

if (!globalState.__firebaseInitialized) {
    globalState.__firebaseInitialized = true;
    if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
        connectFirestoreEmulator(db, 'localhost', 8080);
    }
}
