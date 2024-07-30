// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase para o seu app web
const firebaseConfig = {
  apiKey: "AIzaSyBdvZCnjLG3oaf84l_uWzus2JDAmQEC1d4",
  authDomain: "epc-noticias.firebaseapp.com",
  projectId: "epc-noticias",
  storageBucket: "epc-noticias.appspot.com",
  messagingSenderId: "551256701675",
  appId: "1:551256701675:web:d5dbe8ff1dc60af5715cae",
  measurementId: "G-83MP8117R2"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o sistema de autenticação do Firebase
const auth = getAuth(app);

// Inicializar o storage do Firebase
const storage = getStorage(app);

// Inicializar o firestore do Firebase
const db = getFirestore(app);

// login via google provider
const googleProvider = new GoogleAuthProvider();



export { app, auth, db, storage, googleProvider };
