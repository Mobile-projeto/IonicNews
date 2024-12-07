import { Component } from '@angular/core';
import { TimeTrackerService } from '../services/time-tracker.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  categoryTimes: { [category: string]: number } = {};

  constructor(private timeTrackerService: TimeTrackerService) {}

  // Atualiza os tempos ao entrar na página
  ionViewWillEnter() {
    this.categoryTimes = this.timeTrackerService.getTranslatedTimeSpent();
  }

  // Função para resetar os tempos (opcional)
  resetTimes() {
    this.timeTrackerService.resetTracking();
    this.categoryTimes = {};
  }
}
