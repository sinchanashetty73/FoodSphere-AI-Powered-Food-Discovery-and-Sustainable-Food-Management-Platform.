import { getToken ,onMessage } from "firebase/messaging";
import { messaging } from "./firebase";


export const requestNotificationPermission = async () => {
  console.log("Requesting permission...");

  try {

    const permission = await Notification.requestPermission();
     console.log("Permission:", permission);

     
    if (permission === "granted") {
      console.log("Notification permission granted");

      const currentToken = await getToken(messaging, {
        vapidKey: "BHNo5-b4agILOeAHg07KEGnwLz3Xk4cGjejdTXHElbdyH3Z6Ut_srm8jhIkQGUkDEBvCHsP8n88q36fwdZ5jkjw"
      });

     console.log("FCM TOKEN:", currentToken);
     await fetch("https://foodsphere-api.onrender.com/api/Fcm/save-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token: currentToken,
  }),
});

      return currentToken;
    }

  } catch (error) {
    console.log(error);
  }

  onMessage(messaging, (payload) => {
  console.log("Notification Received:", payload);

  new Notification(
    payload.notification.title,
    {
      body: payload.notification.body,
    }
  );
});
};