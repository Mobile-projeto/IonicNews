import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../firebase-config'; // Importa a configuração do Firebase
import { initializeApp } from 'firebase/app';  // Certifique-se de que a configuração está sendo inicializada corretamente
import { ToastrService } from 'ngx-toastr';  // Importa o ToastrService



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {  // Injeta o ToastrService
    // Inicializa o Firebase apenas uma vez
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // Solicitar permissão para notificações
    Notification.requestPermission().then(permission => {
      console.log('Permissão de notificação:', permission);  // Log para verificar a permissão
      if (permission === 'granted') {
        console.log('Permissão concedida para notificações!'); // Log quando a permissão for concedida
        this.getNotificationToken(messaging);
      } else {
        console.log('Permissão negada para notificações!'); // Log caso a permissão seja negada
      }
    }).catch(error => {
      console.error('Erro ao solicitar permissão para notificações:', error);  // Log para erro na solicitação
    });

    // Receber notificações quando o app estiver em primeiro plano
    onMessage(messaging, (payload) => {
      console.log('Mensagem recebida enquanto o app está em primeiro plano:', payload);
      // Exibe a notificação na tela com o Toastr
      this.showNotification(payload);
    });
  }

  // Função para obter o token de notificações
  getNotificationToken(messaging: any) {
    console.log('Tentando obter o token de notificação...');  // Log antes de solicitar o token
    getToken(messaging, {
      vapidKey: 'BBx_l8s5QikuUCS6lBjs5E09lCARnv-vzv7RXmVN7loOVrtJYFrtNTVkZZZKzyjq8J-IdMfEHI-I50BMpk8tgfY'
    }).then((currentToken) => {
      if (currentToken) {
        console.log('Token de notificação:', currentToken);  // Log do token
      } else {
        console.log('Nenhum token disponível. Solicite permissão para gerar um.'); // Log caso não haja token
      }
    }).catch((err) => {
      console.error('Erro ao obter token:', err);  // Log de erro ao tentar obter o token
    });
  }

  // Função para exibir a notificação usando o Toastr
  showNotification(payload: any) {
    const notificationTitle = payload.notification.title;
    const notificationBody = payload.notification.body;

    // Exibe a notificação com o Toastr
    this.toastr.info(notificationBody, notificationTitle, {
      timeOut: 5000,
      closeButton: true,
    });
  }
}
