// Esse script registra o service worker para o Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

// Inicializar Firebase com a configuração de seu projeto


firebase.initializeApp({
    apiKey: "AIzaSyDBhHI0Ktb94m3G0zDskPFw_pZovTTUlCs",
    authDomain: "newsapp-16d3e.firebaseapp.com",
    projectId: "newsapp-16d3e",
    storageBucket: "newsapp-16d3e.firebasestorage.app",
    messagingSenderId: "898207762151",
    appId: "1:898207762151:web:a5988445031a7dd5fb0442",
    measurementId: "G-B39TCW5JK9"
});

// Obter o serviço de mensagens
const messaging = firebase.messaging();

// Lidar com notificações quando o app estiver em segundo plano ou fechado
messaging.onBackgroundMessage(function(payload) {
  console.log('Mensagem recebida em segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
