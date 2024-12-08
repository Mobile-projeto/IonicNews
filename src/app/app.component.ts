import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';  // Importando o serviço de notificações

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {
    // O serviço já inicializa as notificações, não é necessário chamar aqui
  }
}
