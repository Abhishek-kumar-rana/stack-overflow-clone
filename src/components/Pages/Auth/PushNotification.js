import messaging from './FirebaseInit';
import { getToken, onMessage } from 'firebase/messaging';
import image from "./../../../../public/icon.png"

export const initializePushNotifications = async () => {
  try {
    // Request permission for push notifications
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // Get the token from the messaging service with the correct VAPID key
      const token = await getToken(messaging, {
        vapidKey: 'BJQWGa2-bu06-5wacthGCs8Y_nFf3cCANmKJIrDO1xs0wclGc9o6zk5KMGCwPrmZ5zRt9BP3_15m9sGiUqvKF1E'
      });

      if (token) {
        console.log('FCM Token:', token);
        // Return both token and notificationEnabled as true
        return { token, notificationsEnabled: true };
      } else {
        console.error('No registration token available. Request permission again.');
        return { token: null, notificationsEnabled: true };  // Return notificationEnabled as true, but token is null
      }
    } else {
      console.log('Unable to get permission to notify.');
      
      return { token: null, notificationsEnabled: false };  // Return false if permission is not granted
    }
  } catch (err) {
    console.error('Error getting notification permission or token:', err);
    return { token: null, notificationsEnabled: false };  // Return false in case of error
  }
};

const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj3YK0EfmxFO1R-tw7UnU4zFtJBFrgL9Ibtw&s"


// Handle incoming messages
export const setupMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Display notification using Notification API
    if (Notification.permission === 'granted') {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: img || image || payload.notification.icon
      });
    }
  });
};
