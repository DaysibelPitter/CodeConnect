// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs } from "firebase/firestore";

import { setLogLevel } from "firebase/firestore";

// Activar logs detallados
setLogLevel("debug");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log("Clave API Firebase:", import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
console.log("Configuración de Firebase:", firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

console.log("Firebase App inicializado correctamente:", app);

export const db = getFirestore(app);
console.log("Firestore DB conectado correctamente:", db);
async function testFirestore() {
  try {
    const testCollection = collection(db, "proyectos");
    console.log("🔍 Conectando a la colección 'proyectos'...");
    const snapshot = await getDocs(testCollection);

    console.log("📌 Documentos obtenidos:", snapshot.docs.map(doc => doc.data()));

    if (snapshot.empty) {
      console.warn("⚠️ La colección 'proyectos' está vacía.");
    }
  } catch (error) {
    console.error("❌ Error al conectar con Firestore:", error);
  }
}

testFirestore();
