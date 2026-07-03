import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBLNqWs0WaXRFdLszcVZnD5iC2tFmsPSkk",
  authDomain: "foodsphereai.firebaseapp.com",
  projectId: "foodsphereai",
  storageBucket: "foodsphereai.firebasestorage.app",
  messagingSenderId: "273073140082",
  appId: "1:273073140082:web:b3f9e26a5dca262b27adeb",
  measurementId: "G-E0EX3E6H20"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);