importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLNqWs0WaXRFdLszcVZnD5iC2tFmsPSkk",
  authDomain: "foodsphereai.firebaseapp.com",
  projectId: "foodsphereai",
  storageBucket: "foodsphereai.firebasestorage.app",
  messagingSenderId: "273073140082",
  appId: "1:273073140082:web:b3f9e26a5dca262b27adeb",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo192.png"
    }
  );
});