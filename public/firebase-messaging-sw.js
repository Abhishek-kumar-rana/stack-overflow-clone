if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

// ----------------------------- BELOW PART OF GET NOTIFICATION on website configuration ---------------------------------

    // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  // Your Firebase config keys here
  apiKey: "AIzaSyCk0FuAg0sLN5AhG4eB1aCfYh6MVaqUpCk",
  authDomain: "web-push-n.firebaseapp.com",
  projectId: "web-push-n",
  storageBucket: "web-push-n.appspot.com",
  messagingSenderId: "640886929343",
  appId: "1:640886929343:web:fcee0dfa50e98c7483930a",
  measurementId: "G-TENDLTY2JX"

};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
