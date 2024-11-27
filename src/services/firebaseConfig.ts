

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC1XpE18-IPdt98fOzxXL96IOxHwgtvJKk",
    authDomain: "comic-app-88c02.firebaseapp.com",
    projectId: "comic-app-88c02",
    storageBucket: "comic-app-88c02.firebasestorage.app",
    messagingSenderId: "170410644704",
    appId: "1:170410644704:web:87c59b6738582e17efac85",
    measurementId: "G-93EV85XHLH"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);